<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { useGoalsStore } from '@/stores/goalStore'
import { useAuthStore } from '@/stores/authStore'
import Modal from '@/components/Modal.vue'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
    if (!authStore.userSession) {
        router.push({ name: 'login' })
    }
})

const goalsStore = useGoalsStore()
const showOptions = (goal) => goalsStore.showOptions(goal)
const changeEditState = (goal) => goalsStore.changeEditState(goal)
const deleteGoal = (goal) => goalsStore.deleteGoal(goal)

const route = useRoute()
const id = computed(() => route.params.id)

const goal = ref([]) // Changed to array to prevent v-for object property iteration
const isUpdating = ref(false)

async function getGoal() {
    try {
        const response = await axios.get(`http://localhost:8000/goal/${id.value}`)
        const result = response.data.result
        // Fix: Ensure we are storing an array even if the API returns a single object
        goal.value = Array.isArray(result) ? result : [result]
    } catch (error) {
        console.error('Error fetching goal:', error)
    }
}
getGoal()

const allProgress = ref([])

async function getUserProgress() {
    try {
        const response = await axios.get(`http://localhost:8000/getuserprogress/${id.value}`)
        const result = response.data.result || []
        allProgress.value = result.map(p => ({
            ...p,
            optionsState: false
        })).reverse()
    } catch (error) {
        console.error('Error fetching progress:', error)
    }
}
getUserProgress()

const progress = ref('')
const aiResponse = ref('')
const percentage = ref('')

async function createUserProgress(goalData) {
    if (progress.value.trim() === '') {
        window.alert('Progress cannot be empty')
        return
    }

    isUpdating.value = true
    try {
        const progressHistory = [...allProgress.value].reverse() // Send in chronological order to Gemini
        const geminiResponse = await axios.post(`http://localhost:3000/gemini`, {
            id_goal: id.value,
            goalTitle: goalData.title,
            goalDescription: goalData.description,
            progressHistory: progressHistory.map(entry => ({
                id_goal: entry.id_goal,
                progressText: entry.progress,
                progressAiResponse: entry.ai_response,
                progressCreated: entry.created
            })),
            progress: progress.value
        })

        aiResponse.value = geminiResponse.data.result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
        percentage.value = geminiResponse.data.percentage

        if (aiResponse.value) {
            await axios.post(`http://localhost:8000/createprogress`, {
                id_goal: id.value,
                progress: progress.value,
                ai_response: aiResponse.value,
                progress_percentage: percentage.value
            })
            await updateGoalPercentage(percentage.value)
            progress.value = ''
            await getUserProgress()
        }
    } catch (error) {
        console.error(error)
    } finally {
        isUpdating.value = false
    }
}

async function updateGoalPercentage(newPercent) {
    try {
        await axios.post(`http://localhost:8000/updatepercentage`, {
            id_goal: id.value,
            percentage: newPercent
        })
        await getGoal()
    } catch (error) {
        console.error('Error updating percentage:', error)
    }
}

// Logic: Get the percentage of the entry that will become the "latest" after deletion
const previousPercentage = computed(() => {
    // allProgress is reversed (newest first). Index 0 is current, Index 1 is the previous one.
    if (!allProgress.value || allProgress.value.length < 2) return 0;
    return allProgress.value[1].progress_percentage;
})

async function deleteUserProgress(p) {
    try {
        const response = await axios.post(`http://localhost:8000/deleteprogress`, {
            id_goal: id.value,
            id: p.id,
            percentage: previousPercentage.value,
        })
        if (response) {
            window.alert('User progress deleted')
            await getUserProgress()
            await getGoal()
        }
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <main class="detail-page">
        <Modal />
        <div class="container" v-for="g in goal" :key="g.id">
            <section class="goal-hero-card">
                <div class="card-header">
                    <div class="title-area">
                        <span class="emoji-circle">{{ g.emoji || '🎯' }}</span>
                        <h2>{{ g.title }}</h2>
                    </div>
                    <button class="icon-btn" @click="showOptions(g)">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>

                    <div class="options-popover" v-if="g.optionsState">
                        <button @click="changeEditState(g)"><i class="fa-solid fa-pen"></i> Edit</button>
                        <button class="delete" @click="deleteGoal(g)"><i class="fa-solid fa-trash"></i> Delete</button>
                    </div>
                </div>

                <p class="goal-desc">{{ g.description }}</p>

                <div class="overall-progress">
                    <div class="stats">
                        <span>Current Progress</span>
                        <span class="percent-text">{{ g.percentage || 0 }}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" :style="{ width: (Number(g.percentage) || 0) + '%' }"></div>
                    </div>
                    <div class="completion-badge" v-if="Number(g.percentage) >= 100">
                        <i class="fa-solid fa-crown" style="color: rgb(255, 212, 59);"></i> Goal Completed!
                    </div>
                </div>
            </section>

            <section class="update-section" v-if="Number(g.percentage) < 100">
                <h3>Log New Progress</h3>
                <div class="input-wrapper">
                    <textarea v-model="progress" placeholder="What have you done today towards this goal?"
                        :disabled="isUpdating"></textarea>
                    <button @click="createUserProgress(g)" :disabled="isUpdating">
                        <span v-if="!isUpdating">Update Progress</span>
                        <span v-else><i class="fa-solid fa-circle-notch fa-spin"></i> Analyzing...</span>
                    </button>
                </div>
            </section>

            <section class="timeline">
                <h3>Activity History</h3>
                <div v-if="allProgress.length === 0" class="empty-state">
                    No progress logged yet. Start your journey above!
                </div>
                <div class="timeline-item" v-for="(p, index) in allProgress" :key="p.id">
                    <div class="timeline-header">
                        <span class="date">{{ new Date(p.progress_created).toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        }) }}</span>
                        <div class="timeline-actions">
                            <span class="p-badge">{{ p.progress_percentage }}%</span>
                            <button v-if="index === 0" class="mini-del" @click="deleteUserProgress(p)">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                    <div class="timeline-body">
                        <p class="user-txt">{{ p.progress }}</p>
                        <div class="ai-box">
                            <i class="fa-solid fa-wand-magic-sparkles"></i>
                            <p>{{ p.ai_response }}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.detail-page {
    background-color: #f0f4f8;
    min-height: 100vh;
    padding: 20px 0;
}

.container {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 15px;
}

.goal-hero-card {
    background: white;
    border-radius: 24px;
    padding: 30px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    margin-bottom: 25px;
    position: relative;

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .title-area {
            display: flex;
            align-items: center;
            gap: 15px;

            .emoji-circle {
                background: #f1f2f6;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                font-size: 1.5rem;
            }

            h2 {
                color: #2d3436;
                font-size: 1.4rem;
                margin: 0;
            }
        }
    }
}

.goal-desc {
    color: #636e72;
    line-height: 1.6;
    margin-bottom: 25px;
}

.overall-progress {
    .stats {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        margin-bottom: 10px;
        color: #2d3436;

        .percent-text {
            color: #00C9FF;
        }
    }

    .progress-track {
        height: 12px;
        background: #eee;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
            transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            width: 0%; // Default start
        }
    }
}

.completion-badge {
    margin-top: 15px;
    background: #92FE9D;
    color: #1b4d3e;
    padding: 10px;
    border-radius: 12px;
    text-align: center;
    font-weight: 600;
}

.update-section {
    margin-bottom: 30px;

    h3 {
        margin-bottom: 15px;
        font-size: 1.1rem;
        color: #2d3436;
    }

    .input-wrapper {
        background: white;
        padding: 15px;
        border-radius: 18px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

        textarea {
            width: 100%;
            border: none;
            resize: none;
            height: 80px;
            font-family: inherit;
            font-size: 1rem;
            margin-bottom: 10px;

            &:focus {
                outline: none;
            }
        }

        button {
            background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            float: right;
            transition: 0.3s;

            &:disabled {
                opacity: 0.6;
                cursor: not-allowed;
            }

            &:hover:not(:disabled) {
                transform: translateY(-2px);
            }
        }

        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }
}

.timeline {
    h3 {
        margin-bottom: 15px;
        font-size: 1.1rem;
        color: #2d3436;
    }

    .empty-state {
        text-align: center;
        color: #a4b0be;
        padding: 20px;
        font-style: italic;
    }

    .timeline-item {
        background: white;
        border-radius: 18px;
        padding: 20px;
        margin-bottom: 15px;
        border-left: 5px solid #00C9FF;

        .timeline-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;

            .date {
                font-size: 0.8rem;
                color: #a4b0be;
                font-weight: 600;
            }

            .timeline-actions {
                display: flex;
                align-items: center;
                gap: 10px;

                .p-badge {
                    background: #f1f2f6;
                    padding: 2px 8px;
                    border-radius: 8px;
                    font-size: 0.8rem;
                    font-weight: 700;
                }

                .mini-del {
                    border: none;
                    background: none;
                    color: #ff7675;
                    cursor: pointer;
                    font-size: 0.9rem;
                }
            }
        }

        .user-txt {
            color: #2d3436;
            margin-bottom: 15px;
            font-weight: 500;
            word-break: break-word;
        }

        .ai-box {
            background: linear-gradient(135deg, rgba(0, 201, 255, 0.05) 0%, rgba(146, 254, 157, 0.05) 100%);
            padding: 15px;
            border-radius: 12px;
            display: flex;
            gap: 12px;

            i {
                color: #00C9FF;
                margin-top: 4px;
            }

            p {
                font-size: 0.9rem;
                color: #4b5563;
                line-height: 1.5;
                margin: 0;
            }
        }
    }
}

.options-popover {
    position: absolute;
    top: 60px;
    right: 30px;
    background: white;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 8px;
    z-index: 10;
    display: flex;
    flex-direction: column;

    button {
        background: none;
        border: none;
        padding: 10px 20px;
        text-align: left;
        cursor: pointer;
        border-radius: 8px;

        &:hover {
            background: #f8f9fa;
        }

        &.delete {
            color: #ff7675;
        }
    }
}

.icon-btn {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: #b2bec3;
    cursor: pointer;
}
</style>