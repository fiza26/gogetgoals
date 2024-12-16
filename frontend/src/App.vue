<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/"><span><i class="fa-solid fa-house"></i></span></RouterLink>
    </nav>
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
</style>
