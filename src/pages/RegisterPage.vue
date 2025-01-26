<template>
    <div class="flex h-screen">
        <!-- Left Section -->
        <div class="w-1/2 bg-blue-500 text-white flex flex-col items-center justify-center">
            <img src="@/assets/images/Illustration.png" alt="Illustration" class="mb-6" />
            <h1 class="text-2xl font-bold mb-4">Your place to work</h1>
            <p class="text-lg">Plan. Create. Control.</p>
        </div>

        <!-- Right Section -->
        <div class="w-1/2 flex items-center justify-center bg-gray-100">
            <a-form :model="formState" class="w-1/2" @finish="onFinish" @finishFailed="onFinishFailed">
                <a-form-item label="Name" name="name" :rules="[{ required: true, message: 'Введите имя' }]">
                    <a-input type="text" v-model:value="formState.name" />
                </a-form-item>
                <a-form-item label="Surname" name="surname" :rules="[{ required: true, message: 'Введите фамилию' }]">
                    <a-input type="text" v-model:value="formState.surname" />
                </a-form-item>
                <a-form-item label="Email" name="email"
                    :rules="[{ required: true, type: 'email', message: 'Введите корректный email' }]">
                    <a-input type="email" v-model:value="formState.email" />
                </a-form-item>
                <a-form-item label="Пароль" name="password" :rules="[
                    { required: true, message: 'Введите пароль' },
                    { min: 8, message: 'Пароль должен содержать минимум 8 символов' }
                ]">
                    <a-input type="password" v-model:value="formState.password" />
                </a-form-item>
                <a-form-item label="Повторите пароль" name="confirmPassword" :rules="[
                    { required: true, message: '' },
                    { validator: validateConfirmPassword }
                ]">
                    <a-input type="password" v-model:value="formState.confirmPassword" />
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">Sign Up</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { notification } from "ant-design-vue";
import axios from "@/utils/axios.js";
import { useRouter } from "vue-router";

const router = useRouter();
const formState = reactive({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
});

// Проверка совпадения паролей
const validateConfirmPassword = (rule, value) => {
    if (!value) {
        return Promise.reject("Повторите пароль");
    } else if (value !== formState.password) {
        return Promise.reject("Пароли не совпадают");
    } else {
        return Promise.resolve();
    }
};

const onFinish = () => {
    register();
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const register = async () => {
    try {
        const response = await axios.post("/auth/register", {
            fullname: `${formState.name} ${formState.surname}`,
            email: formState.email,
            password: formState.password,
        });
        notification.success({
            message: "Регистрация успешна",
            description: response.data.message || "Вы успешно зарегистрировались!",
        });
        router.push("/login");
    } catch (err) {
        notification.error({
            message: "Ошибка регистрации",
            description: err.response?.data?.message || "Произошла ошибка при регистрации. Попробуйте снова.",
        });
        console.log("Error:", err);
    }
};
</script>

<style scoped></style>