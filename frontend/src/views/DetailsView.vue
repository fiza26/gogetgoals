<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = computed(() => route.params.id)

const goal = ref(null)

async function getGoal() {
    try {
        const response = await axios.get(`http://localhost:8000/goal/${id.value}`)
        goal.value = response.data.result
    } catch (error) {
        console.log(error)
    }
}
getGoal()

</script>

<template>
    <main>
        <div class="container">
            <div class="card-container">
                <div class="card">
                    <div class="card-header">
                        <h3>{{ goal[0].title }}</h3>
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
                        <p>{{ goal[0].description }}</p>
                        <span>Progress {{ goal[0].target_value }}</span><br>
                    </div>
                    <form class="update-progress" @submit.prevent>
                        <textarea name="" id="" placeholder="Write your progress here..."></textarea><br>
                        <button>Update</button>
                    </form>
                </div>
                <div class="card-progress">
                    <div class="card-progress-header">
                        {{ goal[0].created }}
                    </div>
                    <div class="card-progress-content">
                        <div class="user-progress">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga deserunt architecto nulla
                                qui
                                placeat? Accusantium aspernatur alias ab numquam quod!</p>
                        </div>
                        <hr>
                        <div class="ai-response">
                            <p><i class="fa-solid fa-star"></i> AI Assistant: Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Accusantium cum perspiciatis
                                repellat ullam tenetur ab ut ipsa, quaerat unde minima dolores exercitationem distinctio
                                non doloremque adipisci voluptatibus facilis nostrum accusamus?</p>
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

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 80px;
    margin-right: 80px;

    .card-container {
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

        .add-new {
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            bottom: 50px;
            right: 70px;
            background-color: #92FE9D;
            height: 50px;
            width: 50px;
            border-radius: 50px;
            color: white;
            cursor: pointer;
            background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
            transition: ease-in-out 150ms;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

            &:hover {
                transform: scale(1.1);
            }
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
                color: white;
                border-radius: 15px;
                padding: 5px;
                text-align: center;
                background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
            }

            .card-progress-content {
                margin-top: 15px;

                .user-progress {
                    margin-bottom: 15px;
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