<template>
    <a-col :lg="8">
        <div class="flex items-center justify-between bg-white shadow-md rounded-2xl px-6 h-full">
            <div>
                <h4 class="text-sm text-gray-500">{{ city }}</h4>
                <h2 class="text-2xl font-bold text-gray-900">{{ currentTime }}</h2>
                <p class="text-sm text-gray-500">{{ currentDate }} | {{ currentDay }}</p>
            </div>

            <!-- Weather Icon -->
            <div class="flex items-center">
                <img class="w-16 h-16" :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`"
                    :alt="weather.description" />
                <div>
                    <div class="text-xl font-bold text-blue-500">{{ weather.temp }}°C</div>
                    <div class="text-sm text-gray-500 capitalize">{{ weather.description }}</div>
                </div>
            </div>
        </div>
    </a-col>
</template>

<script setup>
import { ref, onMounted } from "vue";
import dayjs from "dayjs";

const weather = ref({
    temp: null,
    icon: null,
    description: null,
});
const city = "Tashkent"
const currentTime = ref("");
const currentDate = ref("");

const timeFunc = () => {
    // Update time and date
    currentTime.value = dayjs().format("hh:mm A");
    currentDate.value = dayjs().format("DD.MM.YYYY | dddd");
}
onMounted(async () => {
    // Fetch the current weather from OpenWeather API
    const apiKey = "1e3b7d34001f9a7d4dd03bbdb5a19567";
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    weather.value.temp = Math.round(data.main.temp);
    weather.value.icon = data.weather[0].icon;
    weather.value.description = data.weather[0].description;
    timeFunc() 
    setInterval(timeFunc, 10000);
});
</script>
<style scoped></style>