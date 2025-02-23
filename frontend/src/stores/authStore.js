import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const userSession = ref(localStorage.getItem('userSession') === 'true')
    const userId = ref(localStorage.getItem('userId'))

    function setUserSession(value, userId) {
        userSession.value = value
        localStorage.setItem('userSession', value)
        localStorage.setItem('userId', userId)
    }

    function logout() {
        userSession.value = false
        localStorage.removeItem('userSession')
        router.push('/login')
    }

    return { router, userSession, userId, setUserSession, logout }
})
