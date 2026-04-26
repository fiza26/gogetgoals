<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useGoalsStore } from '@/stores/goalStore'
import { useAuthStore } from './stores/authStore'
import { computed } from 'vue'

const route = useRoute()
const authStore = useAuthStore()
const goalsStore = useGoalsStore()

// Check if we are NOT on the login page
const showNav = computed(() => route.name !== 'login' && route.name !== 'landing')

const addNew = () => goalsStore.addNew()
</script>

<template>
  <header v-if="showNav" class="navbar">
    <nav class="nav-content">
      <RouterLink to="/" class="nav-item" active-class="active">
        <i class="fa-solid fa-house"></i>
        <span class="dot"></span>
      </RouterLink>

      <RouterLink to="/profile" class="nav-item" active-class="active">
        <i class="fa-solid fa-user"></i>
        <span class="dot"></span>
      </RouterLink>

      <div class="nav-item logout" @click="authStore.logout()">
        <i class="fa-solid fa-right-from-bracket"></i>
      </div>
    </nav>
  </header>

  <button v-if="showNav" class="fab-button" @click="addNew" aria-label="Add New">
    <i class="fa-solid fa-plus"></i>
  </button>

  <RouterView />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

:root {
  --primary-gradient: linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%);
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

* {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color: #f0f2f5; // Slightly lighter than #ddd for better contrast
  color: #333;
}

.navbar {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: var(--primary-gradient);
  display: flex;
  justify-content: center;
  z-index: 100;
  box-shadow: var(--shadow);

  .nav-content {
    width: 100%;
    max-width: 600px; // Keeps icons grouped nicely on desktop
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}

.nav-item {
  position: relative;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.4rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    color: white;
    transform: translateY(-2px);
  }

  &.active {
    color: white;

    .dot {
      opacity: 1;
      transform: scale(1);
    }
  }

  .dot {
    width: 5px;
    height: 5px;
    background: white;
    border-radius: 50%;
    margin-top: 4px;
    opacity: 0;
    transform: scale(0);
    transition: 0.3s ease;
  }
}

.fab-button {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;
  right: 40px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  color: white;
  background: var(--primary-gradient);
  cursor: pointer;
  box-shadow: 0 8px 15px rgba(0, 201, 255, 0.3);
  z-index: 99;
  font-size: 1.5rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 12px 20px rgba(0, 201, 255, 0.4);
  }

  &:active {
    transform: scale(0.9);
  }
}

@media (max-width: 768px) {
  .fab-button {
    bottom: 30px;
    right: 30px;
    height: 55px;
    width: 55px;
  }
}
</style>