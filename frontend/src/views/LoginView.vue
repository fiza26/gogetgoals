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

onMounted(() => {
    if (authStore.userSession) {
        router.push({ name: 'home' })
    }
})

async function login() {
    try {
        const response = await axios.post('http://localhost:8000/login', {
            username: username.value,
            password: password.value
        });

        console.log(response.data)
        userSession.value = true
        authStore.setUserSession(true)
        window.alert(response.data.message); // Show message from backend
        router.push('/')
    } catch (error) {
        if (error.response) {
            // The server responded with a non-2xx status code
            window.alert(error.response.data.message || 'An error occurred');
            username.value = ''
            password.value = ''
        } else {
            // Other network or client-side errors
            console.log(error);
            window.alert('An error occurred while logging in');
        }
    }
}

const signupState = ref(false)

const signup = () => {
    signupState.value = !signupState.value
}

async function userSignup() {
    try {
        if (!name.value || !username.value || !password.value) {
            window.alert('Input can not be empty')
            return
        }

        const response = await axios.post('http://localhost:8000/signup', {
            name: name.value,
            username: username.value,
            password: password.value
        })

        if (response) {
            window.alert(response.data.message)
            signupState.value = false
            username.value = ''
            password.value = ''
        }

    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <main>
        <div class="card-container">
            <div class="login-card" v-if="!signupState">
                <form @submit.prevent>
                    <label for=""><i class="fa-solid fa-user"></i> Username</label><br><br>
                    <input type="text" placeholder="Enter username" v-model="username" required><br>
                    <label for=""><i class="fa-solid fa-lock"></i> Password</label><br><br>
                    <input type="password" placeholder="Enter password" v-model="password" required><br>
                    <button type="submit" @click="login()">Login <i class="fa-solid fa-arrow-right"></i></button>
                </form><br>
                <p class="sign-up" @click="signup">Sign-Up here</p>
            </div>
            <div class="signup-card" v-if="signupState">
                <form @submit.prevent>
                    <label for=""><i class="fa-solid fa-user"></i> Name</label><br><br>
                    <input type="text" placeholder="Enter name" v-model="name" required><br>
                    <label for=""><i class="fa-solid fa-user"></i> Username</label><br><br>
                    <input type="text" placeholder="Enter username" v-model="username" required><br>
                    <label for=""><i class="fa-solid fa-lock"></i> Password</label><br><br>
                    <input type="password" placeholder="Enter password" v-model="password" required><br>
                    <button type="submit" @click="userSignup()">Sign-Up <i class="fa-solid fa-arrow-right"></i></button>
                </form><br>
                <p class="sign-up" @click="signup()">Login here</p>
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

.card-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-left: 80px;
    margin-right: 80px;

    .login-card {
        padding: 25px;
        width: 400px;
        height: 390px;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);

        form {

            input {
                font-family: 'Poppins', sans-serif;
                width: 100%;
                padding: 10px;
                border-radius: 15px;
                border: none;
                margin-bottom: 20px;
                transition: ease-in-out 0.3s;

                &:hover {
                    border: 1px solid #92FE9D;
                }
            }

            button {
                font-family: 'Poppins', sans-serif;
                width: 100%;
                padding: 7px;
                border-radius: 15px;
                border: none;
                margin-top: 15px;
                color: white;
                cursor: pointer;
                transition: ease-in-out 150ms;
                background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
                box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

                &:hover {
                    transform: scale(1.030);
                }
            }
        }

        .sign-up {
            text-align: center;
            text-decoration: underline;
            cursor: pointer;
        }
    }

    .signup-card {
        padding: 25px;
        width: 400px;
        height: 470px;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);

        form {

            input {
                font-family: 'Poppins', sans-serif;
                width: 100%;
                padding: 10px;
                border-radius: 15px;
                border: none;
                margin-bottom: 20px;
                transition: ease-in-out 0.3s;

                &:hover {
                    border: 1px solid #92FE9D;
                }
            }

            button {
                font-family: 'Poppins', sans-serif;
                width: 100%;
                padding: 7px;
                border-radius: 15px;
                border: none;
                margin-top: 15px;
                color: white;
                cursor: pointer;
                transition: ease-in-out 150ms;
                background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
                box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

                &:hover {
                    transform: scale(1.030);
                }
            }
        }

        .sign-up {
            text-align: center;
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
</style>