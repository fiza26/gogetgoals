<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import axios from 'axios'


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


// Add new goal
const modalState = ref(false)

const addNew = (() => {
  modalState.value = true
})

const closeModal = (() => {
  modalState.value = false;
})

const goalTitle = ref('')
const goalDescription = ref('')
const newGoal = ref(null)

async function addNewGoal() {
  try {
    const response = await axios.post('http://localhost:8000/creategoal', {
      title: goalTitle.value,
      description: goalDescription.value
    })
    newGoal.value = response.data.result
    modalState.value = false
    await getAllGoals()
  } catch (error) {
    console.log(error)
  }
}

// Edit and delete functionality
const showOptions = ((goal) => {
  goal.optionsState = !goal.optionsState
})

async function deleteGoal(goal) {
  try {
    const response = await axios.post('http://localhost:8000/deletegoal', {
      id: goal.id
    })
    if (response.data) {
      window.alert('Selected goal has been deleted')
    }
    await getAllGoals()
  } catch (error) {
    console.log(error)
  }
}


</script>

<template>
  <main>
    <div class="container">
      <div class="card-container">
        <div class="add-new" @click="addNew()"><i class="fa-solid fa-plus"></i></div>
        <div class="modal" v-if="modalState">
          <button class="close-modal" @click="closeModal()"><i class="fa-solid fa-x"></i></button>
          <div class="modal-content">
            <form class="new-goal-form" @submit.prevent>
              <input type="text" placeholder="title" v-model="goalTitle">
              <input type="text" placeholder="description" v-model="goalDescription">
              <button type="button" @click="addNewGoal">Add New Goal</button>
            </form>
          </div>
        </div>
        <div class="card" v-for="goal in allGoals" :key="goal.id">
          <div class="card-header">
            <h3>{{ goal.emoji }} {{ goal.title }}</h3>
            <span @click="showOptions(goal)"><i class="fa-solid fa-bars"></i></span>
            <div class="card-header-options" v-if="goal.optionsState">
              <span><i class="fa-solid fa-pen-to-square"></i></span>
              <span @click="deleteGoal(goal)"><i class="fa-solid fa-delete-left"></i></span>
            </div>
          </div>
          <p>{{ goal.description }}</p>
          <span>Progress {{ goal.target_value }}</span><br>
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

.container {
  margin-top: 20px;
  margin-left: 80px;
  margin-right: 80px;

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
      width: 30rem;
      padding: 15px;
      border-radius: 15px;
      margin: 10px;
      background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      transition: ease-in-out 150ms;

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        cursor: pointer;

        .card-header-options {
          display: flex;
          justify-content: space-between;
          width: 3rem;
          cursor: pointer;
          animation: moveUp 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
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
</style>
