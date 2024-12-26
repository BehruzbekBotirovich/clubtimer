<template>
    <a-col :lg="8">
        <div class="flex items-center justify-between bg-white shadow-md rounded-2xl px-6 h-full">
            <div>
                <h4 class="text-sm text-gray-500">{{ location }}</h4>
                <h2 class="text-2xl font-bold text-gray-900">{{ currentTime }}</h2>
                <p class="text-sm text-gray-500">{{ currentDate }} | {{ currentDay }}</p>
            </div>

            <!-- Weather Icon -->
            <div>
                <a-avatar :src="weatherIconUrl" shape="square" size="large" :alt="weatherDescription" />
            </div>

        </div>
        <!-- Location and Time -->
    </a-col>
</template>

<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { message } from "ant-design-vue";

dayjs.locale("ru");

const location = ref("Ташкент");
const currentTime = ref("");
const currentDate = ref("");
const currentDay = ref("");
const weatherIconUrl = ref("");
const weatherDescription = ref("");

const apiKey = "1e3b7d34001f9a7d4dd03bbdb5a19567"; // Replace with your OpenWeather API key

const fetchWeatherData = async () => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Tashkent&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod === 200) {
            weatherIconUrl.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherDescription.value = data.weather[0].description;
        } else {
            message.error("Не удалось получить данные о погоде.");
        }
    } catch (error) {
        console.error(error);
        message.error("Ошибка при получении данных о погоде.");
    }
};

const updateDateTime = () => {
    const now = dayjs();
    currentTime.value = now.format("hh:mm A");
    currentDate.value = now.format("DD.MM.YYYY");
    currentDay.value = now.format("dddd");
};

onMounted(() => {
    fetchWeatherData();
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update time every minute
});
</script>

<style scoped>
/* Additional styles (if needed) */
</style>