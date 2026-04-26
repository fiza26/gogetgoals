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
    router.push({ name: 'landing' })
  }
})
</script>

<template>
  <main class="page-wrapper">
    <div class="container">
      <div class="card-grid">
        <Modal />
        <Card />
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
// Note: It's better to put global resets (*, a, hr) in a main.scss file, 
// but kept here as per your request.

.page-wrapper {
  min-height: 100vh;
  background-color: #f8f9fa; // Soft background to make cards pop
  padding-bottom: 40px;
}

.container {
  max-width: 1200px; // Limits stretching on ultra-wide screens
  margin: 0 auto;
  padding: 40px 20px;

  .card-grid {
    display: grid;
    // Uses a modern grid approach: automatically fits items based on size
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    align-items: start;
    animation: moveUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
}

hr {
  border: none;
  height: 1px;
  background-color: #eeeeee;
  margin: 20px 0;
}

@keyframes moveUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Adjustments */
@media screen and (max-width: 768px) {
  .container {
    padding: 20px 15px;

    .card-grid {
      grid-template-columns: 1fr; // Full width on mobile
      gap: 16px;
    }
  }
}
</style>