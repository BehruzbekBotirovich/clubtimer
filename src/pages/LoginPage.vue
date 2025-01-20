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
      <a-form :model="formState" name="basic" autocomplete="off" class="w-1/2" @finish="onFinish"
        @finishFailed="onFinishFailed">
        <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input your username!' }]">
          <a-input v-model:value="formState.email" type="email" />
        </a-form-item>

        <a-form-item label="Password" name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <div class="text-red-500 text-semibold py-2">{{ error }}</div>

        <div class="flex items-center justify-between mb-4 mt-10">
          <a-form-item name="remember">
            <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
          </a-form-item>
          <a href="#" class="text-blue-500">Forgot Password?</a>
        </div>

        <a-form-item class="flex justify-center">
          <a-button type="primary" html-type="submit" class="w-24">Log In</a-button>
        </a-form-item>
      </a-form>

    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { ref } from "vue";
import axios from "@/utils/axios.js";
import { useRouter } from "vue-router";
const router = useRouter();

const formState = reactive({
  email: '',
  password: '',
  remember: true,
});

const onFinish = values => {
  console.log('Success:', values);
  login()
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const error = ref("");

const login = async () => {
  try {
    const response = await axios.post("/auth/login", { email: formState.email, password: formState.password });
    const token = response.data.token;
    localStorage.setItem("token", token); // Сохранение токена
    router.push("/cabinet/centers"); // Переход на профиль
  } catch (err) {
    error.value = err.response?.data?.message || "Ошибка входа";
  }
}

</script>
