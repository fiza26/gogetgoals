<script setup>
import { useGoalsStore } from '@/stores/goalStore'

const goalsStore = useGoalsStore()

const editGoal = () => goalsStore.editGoal()
const closeModal = () => goalsStore.closeModal()
const addNewGoal = () => goalsStore.addNewGoal()
</script>

<template>
    <Transition name="fade">
        <div class="modal-overlay" v-if="goalsStore.modalState || goalsStore.editState" @click.self="closeModal">

            <div class="modal-card">
                <button class="close-btn" @click="closeModal" aria-label="Close modal">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="modal-header">
                    <h2>{{ goalsStore.editState ? 'Update Your Goal' : 'Create New Goal' }}</h2>
                    <p>Small steps lead to big results.</p>
                </div>

                <form class="goal-form" @submit.prevent>
                    <div class="input-group">
                        <label>Title</label>
                        <input type="text" placeholder="What do you want to achieve?" v-model="goalsStore.goalTitle">
                    </div>

                    <div class="input-group">
                        <label>Description</label>
                        <textarea placeholder="Add some details..." v-model="goalsStore.goalDescription"></textarea>
                    </div>

                    <div class="actions">
                        <button v-if="goalsStore.modalState" type="submit" class="btn-primary" @click="addNewGoal">
                            Add Goal
                        </button>
                        <button v-if="goalsStore.editState" type="submit" class="btn-primary" @click="editGoal">
                            Update Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(8px); // Glass effect
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
}

.modal-card {
    background: white;
    width: 100%;
    max-width: 450px;
    border-radius: 24px;
    padding: 40px;
    position: relative;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);

    .close-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: #f1f2f6;
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        color: #57606f;
        transition: 0.2s;

        &:hover {
            background: #ff4757;
            color: white;
            transform: rotate(90deg);
        }
    }
}

.modal-header {
    margin-bottom: 25px;

    h2 {
        color: #2d3436;
        font-size: 1.5rem;
        margin-bottom: 5px;
    }

    p {
        color: #a4b0be;
        font-size: 0.9rem;
    }
}

.goal-form {
    .input-group {
        margin-bottom: 20px;

        label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            color: #2d3436;
            margin-bottom: 8px;
            margin-left: 5px;
        }

        input,
        textarea {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 2px solid #f1f2f6;
            font-family: inherit;
            font-size: 1rem;
            transition: all 0.3s ease;

            &:focus {
                outline: none;
                border-color: #00C9FF;
                background: rgba(0, 201, 255, 0.02);
            }
        }

        textarea {
            height: 100px;
            resize: none;
        }
    }
}

.btn-primary {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
    color: white;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 10px 20px rgba(0, 201, 255, 0.2);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 25px rgba(0, 201, 255, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
}

/* Animations */
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>