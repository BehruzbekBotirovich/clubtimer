import { defineStore } from 'pinia';
import axios from '@/utils/axios.js';
// not works ***********************************************
export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        isLoggedIn: !!localStorage.getItem('token'),
    }),

    actions: {
        // Логика для авторизации
        async login(email, password) {
            try {
                const response = await axios.post('/auth/login', { email, password });
                this.token = response.data.token;
                this.role = response.data.role;
                localStorage.setItem('token', this.token);
                localStorage.setItem('role', this.role);
                this.isLoggedIn = true;
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Ошибка авторизации');
            }
        },

        // Логика для регистрации
        async register(name, email, password) {
            try {
                await axios.post('/auth/register', { name, email, password });
                alert("Вы успешно зарегистрировались! Теперь войдите в систему.");
            } catch (error) {
                throw new Error(error.response?.data?.message || 'Ошибка регистрации');
            }
        },

        // Логика для выхода из системы
        logout() {
            this.token = null;
            this.role = null;
            this.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        }
    }
});
