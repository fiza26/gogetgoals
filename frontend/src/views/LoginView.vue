<script setup>
import { ref } from 'vue'
</script>

<template>
    <main>
        <div class="card-container">
            <div class="login-card">
                <form>
                    <label for=""><i class="fa-solid fa-user"></i> Username</label><br><br>
                    <input type="text" placeholder="Enter username"><br>
                    <label for=""><i class="fa-solid fa-lock"></i> Password</label><br><br>
                    <input type="password" placeholder="Enter password"><br>
                    <button type="submit">LOGIN <i class="fa-solid fa-arrow-right"></i></button>
                </form><br>
                <p class="sign-up">Sign-Up here</p>
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
}
</style>