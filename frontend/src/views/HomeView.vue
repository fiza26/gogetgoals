<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import axios from 'axios'

const allGoals = ref([])
const emojis = ref(['😁', '😭', '😎', '🤖', '😽', '🤩'])

async function getAllGoals() {
  try {
    const response = await axios.get('http://localhost:8000/goals')
    allGoals.value = response.data.result.map(goal => ({
      ...goal,
      emoji: emojis.value[Math.floor(Math.random() * emojis.value.length)]
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
        <div class="card" v-for="goal in allGoals" :key="goal.id">
          <RouterLink :to='`/details/${goal.id}`'>
            <h3>{{ goal.emoji }} {{ goal.title }}</h3>
            <p>{{ goal.description }}</p>
            <span>Progress {{ goal.target_value }}</span><br>
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
  // background-color: red;
  margin-top: 20px;
  margin-left: 80px;
  margin-right: 80px;

  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .card {
      width: 30rem;
      padding: 15px;
      border-radius: 15px;
      margin: 10px;
      background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

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
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      }
    }
  }
}
</style>
