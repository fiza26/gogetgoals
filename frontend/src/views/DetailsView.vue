<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useGoalsStore } from '@/stores/goalStore'

const goalsStore = useGoalsStore()

const showOptions = (goal) => goalsStore.showOptions(goal)
const addNewGoal = () => goalsStore.addNewGoal()
const changeEditState = (goal) => goalsStore.changeEditState(goal)
const editGoal = () => goalsStore.editGoal()
const closeModal = () => goalsStore.closeModal()
const deleteGoal = (goal) => goalsStore.deleteGoal(goal)

const route = useRoute()
const id = computed(() => route.params.id)

const goal = ref({})

async function getGoal() {
    try {
        const response = await axios.get(`http://localhost:8000/goal/${id.value}`)
        goal.value = response.data.result
    } catch (error) {
        console.log(error)
    }
}
getGoal()

const allProgress = ref([])

async function getUserProgress() {
    try {
        const response = await axios.get(`http://localhost:8000/getuserprogress/${id.value}`)
        allProgress.value = response.data.result.map(progress => ({
            ...progress,
            optionState: false
        }))
        console.log('All user progress', allProgress.value)
    } catch (error) {
        console.log(error)
    }
}
getUserProgress()

const progress = ref('')
const aiResponse = ref('')
const percentage = ref('')
const newUserProgress = ref(null)

async function createUserProgress(goal) {
    if (progress.value === '') {
        window.alert('Progress can not be empty')
    } else {
        try {
            const progressHistory = allProgress.value.length > 0 ? allProgress.value : [];

            const geminiResponse = await axios.post(`http://localhost:3000/gemini`, {
                id_goal: id.value,
                goalTitle: goal.title,
                goalDescription: goal.description,
                progressHistory: progressHistory.map(entry => ({
                    id_goal: entry.id_goal,
                    progressText: entry.progress,
                    progressAiResponse: entry.ai_response,
                    progressCreated: entry.created
                })),
                progress: progress.value
            })
            aiResponse.value = geminiResponse.data.result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
            console.log('Response:', aiResponse)

            percentage.value = geminiResponse.data.percentage
            console.log('Gemini Response:', geminiResponse.data.percentage);

            if (aiResponse.value) {
                const response = await axios.post(`http://localhost:8000/createprogress`, {
                    id_goal: id.value,
                    progress: progress.value,
                    ai_response: aiResponse.value,
                    progress_percentage: percentage.value
                })
                newUserProgress.value = response.data.result
                await updateGoalPercentage()
                console.log('User Progress:', newUserProgress)
                await getUserProgress()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

async function updateGoalPercentage() {
    try {
        const response = await axios.post(`http://localhost:8000/updatepercentage`, {
            id_goal: id.value,
            percentage: percentage.value
        })
        if (response) {
            await getGoal()
        }
    } catch (error) {
        console.log('Error :', error)
    }
}

async function deleteUserProgress(progress) {
    try {
        const response = await axios.post(`http://localhost:8000/deleteprogress`, {
            id: progress.id
        })
        if (response) {
            window.alert('User progress deleted')
        }
        await getUserProgress()
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <main>
        <div class="modal" v-if="goalsStore.modalState || goalsStore.editState">
            <button class="close-modal" @click="closeModal"><i class="fa-solid fa-x"></i></button>
            <div class="modal-content">
                <form class="new-goal-form" @submit.prevent v-if="goalsStore.modalState">
                    <input type="text" placeholder="title" v-model="goalsStore.goalTitle">
                    <input type="text" placeholder="description" v-model="goalsStore.goalDescription">
                    <button type="button" @click="addNewGoal">Add New Goal</button>
                </form>
                <form class="new-goal-form" @submit.prevent v-if="goalsStore.editState">
                    <input type="text" placeholder="title" v-model="goalsStore.goalTitle">
                    <input type="text" placeholder="description" v-model="goalsStore.goalDescription">
                    <button type="button" @click="editGoal">Update Goal</button>
                </form>
            </div>
        </div>
        <div class="container">
            <div class="card-container">
                <div class="card" v-for="goal in goal" :key="goal.id">
                    <div class="card-header">
                        <h3>{{ goal.title }}</h3>
                        <span class="options" @click="showOptions(goal)"><i class="fa-solid fa-bars"></i></span>
                        <div class="card-header-options" v-if="goal.optionsState">
                            <span class="edit-goal" @click="changeEditState(goal)"><i
                                    class="fa-solid fa-pen-to-square"></i></span>
                            <span class="delete-goal" @click="deleteGoal(goal)"><i
                                    class="fa-solid fa-delete-left"></i></span>
                        </div>
                    </div>
                    <hr>
                    <div class="card-content">
                        <p class="goal-completed" v-if="goal.percentage === '100'"><i class="fa-solid fa-check"></i>
                            This goal is completed
                        </p>
                        <p>{{ goal.description }}</p>
                        <br>
                        <div class="progress-bar">
                            <div class="progress" :style="{ width: goal.percentage + '%' }">
                                <p class="progress-percentage">{{ goal.percentage }}%</p>
                            </div>
                        </div>
                    </div>

                    <form class="update-progress" @submit.prevent>
                        <textarea v-if="goal.percentage != '100'" name="" id=""
                            placeholder="Write your progress here..." v-model="progress"></textarea><br>
                        <button v-if="goal.percentage != '100'" @click="createUserProgress(goal)">Update</button>
                    </form>
                </div>
                <div class="card-progress" v-for="progress in allProgress" :key="progress.id">
                    <div class="card-progress-header">
                        <div class="card-progress-date">
                            <i class="fa-solid fa-calendar-days"></i> {{ new
                                Date(progress.progress_created).toLocaleString() }}
                        </div>
                        <span class="options" @click="showOptions(progress)"><i class="fa-solid fa-bars"></i></span>
                        <div class="card-progress-options" v-if="progress.optionsState">
                            <span class="delete-progress" @click="deleteUserProgress(progress)"><i
                                    class="fa-solid fa-delete-left"></i></span>
                        </div>
                    </div>
                    <div class="card-progress-content">
                        <div class="user-progress">
                            <p>{{ progress.progress }}</p>
                            <p>Progress : {{ progress.progress_percentage }}%</p>
                        </div>
                        <hr>
                        <div class="ai-response">
                            <p><i class="fa-solid fa-star"></i> AI Assistant: {{ progress.ai_response }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

a {
    text-decoration: none;
    color: black;
}

hr {
    border: 1px solid #dddd;
    border-radius: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;

    .close-modal {
        position: fixed;
        top: 20px;
        right: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        font-family: "Poppins", sans-serif;
        border: none;
        width: 50px;
        height: 50px;
        padding: 20px;
        border-radius: 50px;
        transition: ease-in-out 150ms;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

        &:hover {
            transform: scale(1.1);
        }
    }

    .modal-content {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 50px;
        animation: moveUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

        .new-goal-form {
            height: 12rem;
            width: 30rem;
            padding: 15px;
            border-radius: 15px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);

            input {
                font-family: 'Poppins', sans-serif;
                width: 100%;
                padding: 10px;
                margin-top: 10px;
                border-radius: 15px;
                border: none;
            }

            button {
                font-family: 'Poppins', sans-serif;
                border: none;
                color: white;
                padding: 7px;
                width: 8rem;
                border-radius: 10px;
                cursor: pointer;
                background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
                float: right;
                margin-top: 15px;
                transition: ease-in-out 150ms;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 80px;
    margin-right: 80px;

    .card-container {
        width: 100%;
        max-width: 40rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        margin-top: 15px;
        margin-bottom: 15px;
        animation: moveUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

        .card {
            width: 100%;
            padding: 15px;
            border-radius: 15px;
            background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            transition: ease-in-out 150ms;

            .card-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                cursor: pointer;

                .options {
                    margin-left: 10px;
                    transition: ease-in-out 150ms;

                    &:hover {
                        transform: scale(1.1);
                    }
                }

                .card-header-options {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    width: 3rem;
                    cursor: pointer;
                    margin-left: 10px;
                    animation: moveUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                    .edit-goal {
                        transition: ease-in-out 150ms;

                        &:hover {
                            transform: scale(1.1);
                        }
                    }

                    .delete-goal {
                        transition: ease-in-out 150ms;

                        &:hover {
                            transform: scale(1.1);
                        }
                    }
                }
            }

            .card-content {
                margin-top: 15px;

                .goal-completed {
                    background-color: #92FE9D;
                    color: white;
                    padding: 10px;
                    width: 100%;
                    border-radius: 15px;
                    text-align: center;
                    margin-bottom: 30px;
                }

                .progress-bar {
                    width: 100%;
                    border: 2px solid white;
                    border-radius: 15px;
                    margin-top: 10px;

                    .progress {
                        border-radius: 15px;
                        width: 0%;
                        transition: ease-in-out 0.1s;
                        background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);

                        .progress-percentage {
                            text-align: center;
                            color: white;
                        }
                    }
                }
            }

            .update-progress {
                margin-top: 15px;

                textarea {
                    font-family: 'Poppins', sans-serif;
                    border-radius: 10px;
                    width: 100%;
                    height: 5rem;
                    padding: 10px;
                    border: none;
                    resize: vertical;
                }
            }

            button {
                font-family: 'Poppins', sans-serif;
                border: none;
                color: white;
                padding: 7px;
                width: 8rem;
                margin-top: 5px;
                border-radius: 10px;
                cursor: pointer;
                background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
                float: right;
                transition: ease-in-out 150ms;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;


                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        .card-progress {
            width: 100%;
            margin-top: 15px;
            padding: 15px;
            border-radius: 15px;
            background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            transition: ease-in-out 150ms;

            .card-progress-header {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .card-progress-date {
                    color: white;
                    border-radius: 15px;
                    padding: 5px;
                    width: 100%;
                    text-align: center;
                    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
                }

                .options {
                    margin-left: 10px;
                    cursor: pointer;
                    transition: ease-in-out 150ms;

                    &:hover {
                        transform: scale(1.1);
                    }
                }

                .card-progress-options {
                    margin-left: 15px;
                    cursor: pointer;
                    animation: moveUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

                    .delete-progress {
                        transition: ease-in-out 150ms;

                        &:hover {
                            transform: scale(1.1);
                        }
                    }
                }

            }

            .card-progress-content {
                margin-top: 15px;

                .user-progress {
                    margin-bottom: 15px;
                    word-wrap: break-word;
                }

                .ai-response {
                    margin-top: 15px;
                }
            }
        }
    }
}

@keyframes moveUp {
    0% {
        transform: scale(0);
        opacity: 0;
        border-radius: 15px;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@media screen and (max-width: 768px) {
    .container {
        margin-left: 50px;
        margin-right: 50px;
    }
}
</style>