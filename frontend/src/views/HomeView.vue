<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import Modal from "@/components/Modal.vue"
import Card from '@/components/Card.vue'

const authStore = useAuthStore()

const router = useRouter()

onMounted(() => {
  if (!authStore.userSession) {
    router.push({ name: 'login' })
  }
})
</script>

<template>
  <main>
    <div class="container">
      <div class="card-container">
        <Modal />
        <Card />
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
