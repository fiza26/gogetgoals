<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useGoalsStore } from '@/stores/goalStore'

const goalsStore = useGoalsStore()

const addNew = () => goalsStore.addNew()
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/"><span><i class="fa-solid fa-house"></i></span></RouterLink>
    </nav>
    <div class="add-new" @click="addNew"><i class="fa-solid fa-plus"></i></div>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #dddd;
}

nav a {
  text-decoration: none;
  color: white;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
  height: 60px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

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
  z-index: 5;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
