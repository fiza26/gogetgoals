<script setup>
import { RouterLink } from 'vue-router'
import { useGoalsStore } from '@/stores/goalStore'

const goalsStore = useGoalsStore()

const showOptions = (goal) => goalsStore.showOptions(goal)
const changeEditState = (goal) => goalsStore.changeEditState(goal)
const deleteGoal = (goal) => goalsStore.deleteGoal(goal)
</script>

<template>
    <div class="card" v-for="goal in goalsStore.allGoals" :key="goal.id">
        <div class="card-header">
            <h3>{{ goal.emoji }} {{ goal.title }}</h3>
            <div class="options-wrapper">
                <span class="options" @click="showOptions(goal)"><i class="fa-solid fa-bars"></i></span>
                <div class="card-header-options" v-if="goal.optionsState">
                    <span class="edit-goal" @click="changeEditState(goal)"><i
                            class="fa-solid fa-pen-to-square"></i></span>
                    <span class="delete-goal" @click="deleteGoal(goal)"><i class="fa-solid fa-delete-left"></i></span>
                </div>
            </div>
        </div>
        <hr>
        <div class="card-content">
            <p>{{ goal.description }}</p>
            <span v-if="goal?.percentage && goal.percentage > 0"><i class="fa-solid fa-spinner"></i> {{ goal.percentage
                }}%</span>
            <span v-if="goal?.percentage === undefined || goal?.percentage === null || goal?.percentage === ''">
                0%
            </span>
        </div>
        <RouterLink :to='`/details/${goal.id}`'>
            <button>Details</button>
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped>
hr {
    border: 1px solid #dddd;
    border-radius: 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.card {
    max-width: 40rem;
    padding: 15px;
    border-radius: 15px;
    margin-bottom: 15px;
    background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    transition: ease-in-out 150ms;
    animation: moveUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;

        .options-wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 100px;
        }

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

        p {
            overflow: hidden;
            text-overflow: ellipsis;
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