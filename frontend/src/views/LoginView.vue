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
                    <button type="submit">Login</button>
                </form>
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
        // display: flex;
        // justify-content: center;
        // align-items: center;
        width: 400px;
        height: 400px;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);

        form {
            margin-top: 50px;
            padding: 15px;
            
            // background-color: yellow;

            input {
                font-family: 'Poppins', sans-serif;
                width: 100%;
                padding: 10px;
                border-radius: 15px;
                border: none;
                margin-bottom: 20px;
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
                background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
            }
        }
    }
}
</style>