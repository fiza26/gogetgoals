import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter()
    const userSession = ref(localStorage.getItem('userSession') === 'true')

    function setUserSession(value) {
        userSession.value = value
        localStorage.setItem('userSession', value)
    }

    function logout() {
        userSession.value = false
        localStorage.removeItem('userSession')
        router.push('/login')
    }

    return { router, userSession, setUserSession, logout }
})
