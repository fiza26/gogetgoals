<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useGoalsStore } from '@/stores/goalStore'
import { useRouter } from 'vue-router'
import Modal from '@/components/Modal.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
    if (!authStore.userSession) {
        router.push({ name: 'login' })
    }
})

const goalsStore = useGoalsStore()

const onGoingGoal = computed(() => {
    return goalsStore.allGoals.filter(goal => goal.percentage != '100')
})

const completedGoal = computed(() => {
    return goalsStore.allGoals.filter(goal => goal.percentage === '100')
})

const score = computed(() => {
    const totalCompleted = goalsStore.allGoals.filter(goal => goal.percentage === '100')
    // Logic kept: length + 20
    return totalCompleted.length + 10 * 2
})
</script>

<template>
    <main class="dashboard">
        <div class="container">
            <Modal />

            <header class="dashboard-header">
                <h2>Your Progress Overview</h2>
                <p>Keep pushing toward your goals, {{ authStore.userSession?.name || 'User' }}!</p>
            </header>

            <div class="stats-grid">
                <div class="stat-card ongoing">
                    <div class="icon-box">
                        <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                    </div>
                    <div class="stat-info">
                        <h1>{{ onGoingGoal.length }}</h1>
                        <p>On Going Goals</p>
                    </div>
                </div>

                <div class="stat-card completed">
                    <div class="icon-box">
                        <i class="fa-solid fa-check-double"></i>
                    </div>
                    <div class="stat-info">
                        <h1>{{ completedGoal.length }}</h1>
                        <p>Completed Goals</p>
                    </div>
                </div>

                <div class="stat-card score">
                    <div class="icon-box">
                        <i class="fa-solid fa-award"></i>
                    </div>
                    <div class="stat-info">
                        <h1>{{ score }}</h1>
                        <p>Total Experience</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.dashboard {
    min-height: calc(100vh - 70px); // Subtracting navbar height
    background-color: #f0f4f8;
    padding-top: 40px;
}

.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
}

.dashboard-header {
    margin-bottom: 30px;

    h2 {
        color: #2d3436;
        font-size: 1.8rem;
        font-weight: 700;
    }

    p {
        color: #636e72;
        font-size: 1rem;
    }
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    animation: moveUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    .stat-card {
        background: white;
        border-radius: 24px;
        padding: 30px;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.5);

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .icon-box {
            width: 60px;
            height: 60px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            color: white;
        }

        .stat-info {
            h1 {
                font-size: 2rem;
                color: #2d3436;
                margin: 0;
                line-height: 1;
            }

            p {
                color: #a4b0be;
                font-size: 0.9rem;
                font-weight: 500;
                margin-top: 5px;
            }
        }

        // Distinct colors for each category
        &.ongoing .icon-box {
            background: linear-gradient(135deg, #00C9FF 0%, #00acc1 100%);
        }

        &.completed .icon-box {
            background: linear-gradient(135deg, #92FE9D 0%, #52c41a 100%);
        }

        &.score .icon-box {
            background: linear-gradient(135deg, #FFD700 0%, #f39c12 100%);
        }
    }
}

@keyframes moveUp {
    0% {
        transform: translateY(30px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Responsive */
@media screen and (max-width: 992px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media screen and (max-width: 600px) {
    .dashboard {
        padding-top: 20px;
    }

    .stats-grid {
        grid-template-columns: 1fr;
        gap: 15px;

        .stat-card {
            padding: 20px;
        }
    }

    .dashboard-header {
        text-align: center;

        h2 {
            font-size: 1.5rem;
        }
    }
}
</style>