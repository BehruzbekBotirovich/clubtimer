<template>
  <a-col :lg="8">
    <div class="flex p-6 rounded-xl shadow-lg bg-white">
      <!-- Иконка и название -->
      <a-col :lg="8" class="mr-2">
        <div class="flex justify-center items-center w-full">
          <ps-timer v-if="props.type ==='console' "/>
          <board-timer v-if="props.type==='board'"/>
          <img v-if="props.type==='karaoke'" alt="karaoke" src="@/components/icons/KaraokeTimer.png" style="height:90px"/>
        </div>
        <h3 class="text-2xl font-bold text-gray-700 text-center mt-2 mb-6">{{ name }}</h3>
        <p class="flex items-center gap-2 text-center">
          <span class="font-semibold text-blue-900">Price:</span> {{ price }}$/hour
        </p>
      </a-col>

      <!-- Таймер -->
      <a-col :lg="16" class="w-full">
        <div class="space-y-4 mb-4">
          <div :class="progressClass" class="timer-display">{{ formattedTime }}</div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div :class="progressClass" class="h-2 rounded-full" :style="{ width: `${progress}%` }"></div>
          </div>
        </div>

        <!-- Информация о времени -->
        <div class="flex justify-between w-full mb-4 text-sm text-gray-600">
          <div class="font-semibold py-2 px-3 rounded-md bg-gray-200">Start: {{ startTime }}</div>
          <div class="font-semibold py-2 px-3 rounded-md bg-gray-200">End: {{ endTime }}</div>
        </div>

        <!-- Кнопки управления -->
        <div class="flex justify-center">
          <a-button-group class="custom-button-group">
            <a-button type="default" @click="stopTimer"
                      class="flex items-center justify-center border-r-0 rounded-l-lg">
              <stop-icon/>
              <span class="ml-1 text">Stop</span>
            </a-button>
            <a-button type="default" @click="addTime" class="flex items-center justify-center rounded-r-lg">
              <add-icon/>
              <span class="ml-1 text">Add</span>
            </a-button>
          </a-button-group>
        </div>
      </a-col>
    </div>
  </a-col>
</template>

<script setup>
import PsTimer from "@/components/icons/PsTimer.vue";
import StopIcon from "@/components/icons/StopIcon.vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import BoardTimer from "@/components/icons/BoardTimer.vue";

import {ref, computed, onMounted, onUnmounted} from "vue";
import dayjs from "dayjs";

const props = defineProps({
  price: Number,
  type: String,
  startTime: String,
  endTime: String,
  name: String,
});

const totalSeconds = ref(30); // Изначальное время
const elapsedSeconds = ref(0); // Прошедшее время
let timer = null;

// Добавить время
const addTime = () => {
  totalSeconds.value += 1800; // +30 минут
};

// Остановить таймер
const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

// Запуск таймера
const startTimer = () => {
  timer = setInterval(() => {
    if (elapsedSeconds.value < totalSeconds.value) {
      elapsedSeconds.value++;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

// Запуск таймера при монтировании
onMounted(() => startTimer());

// Очистка таймера при размонтировании
onUnmounted(() => clearInterval(timer));

// Отформатированное время
const formattedTime = computed(() => {
  const remaining = totalSeconds.value - elapsedSeconds.value;
  const hours = String(Math.floor(remaining / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
  const seconds = String(remaining % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
});

// Класс прогресса
const progress = computed(() => (elapsedSeconds.value / totalSeconds.value) * 100);
const progressClass = computed(() =>
    progress.value <= 50
        ? "bg-green-500"
        : progress.value <= 90
            ? "bg-yellow-500"
            : "bg-red-400"
);
</script>

<style scoped>
.timer-display {
  width: 120px;
  padding: 12px 30px;
  border-radius: 8px;
}

.custom-button-group .ant-btn {
  border-color: #d1d5db;
  padding: 1.1rem 1.25rem;
}

.custom-button-group .ant-btn:hover {
  border-color: #6b7280;
}
</style>
