<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const name = ref('')
const username = ref('')
const password = ref('')
const userSession = ref(false)
const signupState = ref(false)
const isLoading = ref(false)

onMounted(() => {
    if (authStore.userSession) {
        router.push({ name: 'home' })
    }
})

const toggleAuthMode = () => {
    signupState.value = !signupState.value
    // Clear inputs when switching
    username.value = ''
    password.value = ''
    name.value = ''
}

async function login() {
    isLoading.value = true
    try {
        const response = await axios.post('http://localhost:8000/login', {
            username: username.value,
            password: password.value
        });

        userSession.value = true
        authStore.setUserSession(true, response.data.user.id)
        router.push('/')
    } catch (error) {
        window.alert(error.response?.data?.message || 'Login failed');
        password.value = ''
    } finally {
        isLoading.value = false
    }
}

async function userSignup() {
    if (!name.value || !username.value || !password.value) {
        window.alert('Input cannot be empty')
        return
    }
    isLoading.value = true
    try {
        const response = await axios.post('http://localhost:8000/signup', {
            name: name.value,
            username: username.value,
            password: password.value
        })

        if (response) {
            window.alert('Account created successfully!')
            signupState.value = false
            username.value = ''
            password.value = ''
        }
    } catch (error) {
        window.alert(error.response?.data?.message || 'Signup failed');
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <main class="auth-page">
        <div class="auth-container">
            <div class="auth-header">
                <div class="logo-circle">
                    <i class="fa-solid fa-bullseye"></i>
                </div>
                <h1>{{ signupState ? 'Create Account' : 'Welcome Back' }}</h1>
                <p>{{ signupState ? 'Start tracking your goals today' : 'Log in to continue your journey' }}</p>
            </div>

            <div class="auth-card">
                <form @submit.prevent="signupState ? userSignup() : login()">
                    <div v-if="signupState" class="input-group">
                        <label><i class="fa-solid fa-signature"></i> Full Name</label>
                        <input type="text" placeholder="John Doe" v-model="name" required>
                    </div>

                    <div class="input-group">
                        <label><i class="fa-solid fa-user"></i> Username</label>
                        <input type="text" placeholder="username123" v-model="username" required>
                    </div>

                    <div class="input-group">
                        <label><i class="fa-solid fa-lock"></i> Password</label>
                        <input type="password" placeholder="••••••••" v-model="password" required>
                    </div>

                    <button type="submit" class="submit-btn" :disabled="isLoading">
                        <span v-if="!isLoading">
                            {{ signupState ? 'Sign Up' : 'Login' }}
                            <i class="fa-solid fa-arrow-right"></i>
                        </span>
                        <i v-else class="fa-solid fa-circle-notch fa-spin"></i>
                    </button>
                </form>

                <div class="auth-footer">
                    <p v-if="!signupState">
                        Don't have an account? <span @click="toggleAuthMode">Sign-Up here</span>
                    </p>
                    <p v-else>
                        Already have an account? <span @click="toggleAuthMode">Login here</span>
                    </p>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at top left, #e3ffe7 0%, #d9e7ff 100%);
    font-family: 'Poppins', sans-serif;
    padding: 20px;
}

.auth-container {
    width: 100%;
    max-width: 420px;
    animation: fadeIn 0.6s ease-out;
}

.auth-header {
    text-align: center;
    margin-bottom: 30px;

    .logo-circle {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #00C9FF 0%, #92FE9D 100%);
        border-radius: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 15px;
        color: white;
        font-size: 1.8rem;
        box-shadow: 0 10px 20px rgba(0, 201, 255, 0.2);
    }

    h1 {
        color: #2d3436;
        font-size: 1.8rem;
        font-weight: 700;
        margin-bottom: 5px;
    }

    p {
        color: #636e72;
        font-size: 0.9rem;
    }
}

.auth-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 40px;
    border-radius: 24px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);

    .input-group {
        margin-bottom: 20px;

        label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            color: #2d3436;
            margin-bottom: 8px;

            i {
                margin-right: 5px;
                color: #00C9FF;
            }
        }

        input {
            width: 100%;
            padding: 12px 16px;
            border-radius: 12px;
            border: 2px solid transparent;
            background: white;
            font-family: inherit;
            transition: all 0.3s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.02);

            &:focus {
                outline: none;
                border-color: #92FE9D;
                box-shadow: 0 0 0 4px rgba(146, 254, 157, 0.1);
            }
        }
    }

    .submit-btn {
        width: 100%;
        padding: 14px;
        border-radius: 12px;
        border: none;
        background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
        color: white;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 201, 255, 0.3);
        }

        &:active {
            transform: translateY(0);
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }
}

.auth-footer {
    margin-top: 25px;
    text-align: center;
    font-size: 0.9rem;
    color: #636e72;

    span {
        color: #00C9FF;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        transition: color 0.2s;

        &:hover {
            color: #92FE9D;
            text-decoration: underline;
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>