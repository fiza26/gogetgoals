<script setup>
import { ref, computed, onMounted } from 'vue'
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
    const totalScore = goalsStore.allGoals.filter(goal => goal.percentage === '100')
    return totalScore.length + 10 * 2
})
</script>

<template>
    <div class="container">
        <div class="card-container">
            <Modal />
            <div class="card">
                <h1>{{ onGoingGoal.length }}</h1>
                <p><i class="fa-solid fa-spinner"></i> On Going Goal</p>
            </div>
            <div class="card">
                <h1>{{ completedGoal.length }}</h1>
                <p><i class="fa-solid fa-list"></i> Completed Goal</p>
            </div>
            <div class="card">
                <h1>{{ score }}</h1>
                <p><i class="fa-solid fa-star"></i> Score</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    margin-top: 20px;
    margin-left: 80px;
    margin-right: 80px;

    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;

        .card {
            width: 20rem;
            padding: 15px;
            border-radius: 15px;
            margin-bottom: 15px;
            background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            transition: ease-in-out 150ms;
            animation: moveUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
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

    .container .card-container .card {
        width: 100%;
    }
}
</style>