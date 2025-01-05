<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import axios from 'axios'
import { useGoalsStore } from '@/stores/goalStore'

const goalsStore = useGoalsStore()

const showOptions = (goal) => goalsStore.showOptions(goal)
const changeEditState = (goal) => goalsStore.changeEditState(goal)
const editGoal = () => goalsStore.editGoal()
const addNew = () => goalsStore.addNew()
const closeModal = () => goalsStore.closeModal()
const deleteGoal = (goal) => goalsStore.deleteGoal(goal)
const addNewGoal = () => goalsStore.addNewGoal()

// Get all goals
const allGoals = ref([])
const emojis = ref(['😁', '😭', '😎', '🤖', '😽', '🤩'])

async function getAllGoals() {
  try {
    const response = await axios.get('http://localhost:8000/goals')
    allGoals.value = response.data.result.map(goal => ({
      ...goal,
      emoji: emojis.value[Math.floor(Math.random() * emojis.value.length)],
      optionsState: false
    }))
  } catch (error) {
    console.log(error)
  }
}
getAllGoals()


</script>

<template>
  <main>
    <div class="container">
      <div class="card-container">
        <div class="add-new" @click="addNew"><i class="fa-solid fa-plus"></i></div>
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
        <div class="card" v-for="goal in allGoals" :key="goal.id">
          <div class="card-header">
            <h3>{{ goal.emoji }} {{ goal.title }}</h3>
            <span class="options" @click="showOptions(goal)"><i class="fa-solid fa-bars"></i></span>
            <div class="card-header-options" v-if="goal.optionsState">
              <span class="edit-goal" @click="changeEditState(goal)"><i class="fa-solid fa-pen-to-square"></i></span>
              <span class="delete-goal" @click="deleteGoal(goal)"><i class="fa-solid fa-delete-left"></i></span>
            </div>
          </div>
          <hr>
          <div class="card-content">
            <p>{{ goal.description }}</p>
            <span>Progress {{ goal.target_value }}</span><br>
          </div>
          <RouterLink :to='`/details/${goal.id}`'>
            <button>Update</button>
          </RouterLink>
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
  margin-top: 20px;
  margin-left: 80px;
  margin-right: 80px;

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: relative;

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
