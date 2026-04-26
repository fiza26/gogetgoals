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
            <div class="title-group">
                <span class="emoji-box">{{ goal.emoji }}</span>
                <h3>{{ goal.title }}</h3>
            </div>

            <div class="options-container">
                <button class="icon-btn menu-btn" @click.stop="showOptions(goal)"
                    :class="{ active: goal.optionsState }">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>

                <Transition name="slide-fade">
                    <div class="options-menu" v-if="goal.optionsState">
                        <button class="icon-btn edit" @click="changeEditState(goal)">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button class="icon-btn delete" @click="deleteGoal(goal)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </Transition>
            </div>
        </div>

        <div class="card-body">
            <p class="description">{{ goal.description }}</p>

            <div class="progress-section">
                <div class="progress-info">
                    <span><i class="fa-solid fa-chart-line"></i> Progress</span>
                    <span class="percentage">{{ goal.percentage || 0 }}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" :style="{ width: (goal.percentage || 0) + '%' }"></div>
                </div>
            </div>
        </div>

        <div class="card-footer">
            <RouterLink :to="`/details/${goal.id}`" class="details-link">
                Details <i class="fa-solid fa-arrow-right-long"></i>
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card {
    background: white;
    border-radius: 20px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.03);

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;

        .title-group {
            display: flex;
            align-items: center;
            gap: 12px;

            .emoji-box {
                font-size: 1.5rem;
                background: #f8f9fa;
                padding: 8px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            h3 {
                font-size: 1.15rem;
                color: #2d3436;
                font-weight: 600;
                margin: 0;
            }
        }
    }

    .options-container {
        display: flex;
        align-items: center;
        gap: 8px;
        position: relative;

        .options-menu {
            display: flex;
            gap: 8px;
            background: #f8f9fa;
            padding: 5px 10px;
            border-radius: 30px;
        }
    }

    .icon-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        color: #b2bec3;
        transition: 0.2s ease;
        font-size: 1rem;

        &:hover {
            color: #00C9FF;
        }

        &.delete:hover {
            color: #ff7675;
        }

        &.active {
            color: #2d3436;
        }
    }

    .card-body {
        .description {
            color: #636e72;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .progress-section {
            .progress-info {
                display: flex;
                justify-content: space-between;
                font-size: 0.85rem;
                color: #2d3436;
                font-weight: 600;
                margin-bottom: 8px;

                .percentage {
                    color: #00C9FF;
                }
            }

            .progress-bar-bg {
                height: 8px;
                background: #eee;
                border-radius: 10px;
                overflow: hidden;

                .progress-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
                    border-radius: 10px;
                    transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1);
                }
            }
        }
    }

    .card-footer {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;

        .details-link {
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            color: white;
            background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
            padding: 8px 20px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 201, 255, 0.2);

            &:hover {
                gap: 12px;
                box-shadow: 0 6px 20px rgba(0, 201, 255, 0.3);
            }
        }
    }
}

/* Animations */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from {
    transform: translateX(10px);
    opacity: 0;
}

@media (max-width: 768px) {
    .card {
        max-width: 100%;
    }
}
</style>