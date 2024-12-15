<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const id = computed(() => route.params.id)

const goal = ref(null)

async function getGoal() {
    try {
        const response = await axios.get(`http://localhost:8000/goal/${id.value}`)
        goal.value = response.data.result
    } catch (error) {
        console.log(error)
    }
}
getGoal()

</script>

<template>
    <h1>Test</h1>
    {{ id }}
    {{ goal[0].title }}
</template>

<style lang="scss" scoped></style>