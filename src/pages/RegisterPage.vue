<template>
    <div class="register-container">
        <h1>Регистрация</h1>
        <form @submit.prevent="register">
            <a-form-item label="ФИО">
                <a-input type="text" id="fio" v-model:value="fio" required />
            </a-form-item>
            <a-form-item label="Email">
                <a-input type="email" id="email" v-model:value="email" required />
            </a-form-item>
            <a-form-item label="Пароль">
                <a-input type="password" id="password" v-model:value="password" required />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" htmlType="submit">Зарегистрироваться</a-button>
            </a-form-item>
        </form>
        <a-alert v-if="error" type="error" message="Ошибка" :description="error" show-icon />
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/utils/axios.js";

const fio = ref("");
const email = ref("");
const password = ref("");
const error = ref("");

const register = async () => {
    try {
        console.log({ name: fio.value, email: email.value, password: password.value })
        await axios.post("/auth/register", { name: fio.value, email: email.value, password: password.value });
        alert("Вы успешно зарегистрировались! Теперь войдите в систему.");
        fio.value = "";
        email.value = "";
        password.value = "";
        error.value = ""; // Очистка ошибок после успешной регистрации
    } catch (err) {
        error.value = err.response?.data?.message || "Ошибка регистрации";
    }
};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
}
</style>
