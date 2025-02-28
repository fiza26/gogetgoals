<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useGoalsStore } from '@/stores/goalStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()

const router = useRouter()

onMounted(() => {
    if (!authStore.userSession) {
        router.push({ name: 'login' })
    }
})

const goalsStore = useGoalsStore()

const editGoal = () => goalsStore.editGoal()
const closeModal = () => goalsStore.closeModal()
const addNewGoal = () => goalsStore.addNewGoal()

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