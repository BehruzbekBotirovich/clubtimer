<template>
    <a-col :lg="8">
        <div class=" flex p-6   rounded-xl shadow-lg bg-white ">
            <!-- Icon and Name -->
            <a-col :lg="8" class="mr-2">
                <div class="flex justify-center items-center w-full">
                    <svg width="84" height="80" viewBox="0 0 84 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M57.4876 66L53.5501 53.5C53.8126 52.25 54.0751 51.25 54.0751 50C54.0751 43 48.3001 37.5 40.9501 37.5C38.0626 37.5 35.4376 38.5 33.0751 40H27.3001C24.9376 38.5 22.3126 37.5 19.4251 37.5C12.0751 37.5 6.30008 43 6.30008 50C6.30008 51.25 6.56258 52.25 6.82508 53.5L2.88758 66C2.10008 68 2.62508 70.25 3.93758 72C5.51258 74 7.61258 75 9.97508 75C12.3376 75 14.4376 74 15.7501 72.25L24.1501 62.5H36.2251L44.3626 72.25C45.6751 74 48.0376 75 50.1376 75C52.5001 75 54.6001 74 56.1751 72.25C57.7501 70.25 58.0126 68 57.4876 66ZM41.2126 54.25C40.6876 54.75 40.1626 55 39.3751 55C38.5876 55 38.0626 54.75 37.5376 54.25C37.0126 53.75 36.7501 53.25 36.7501 52.5C36.7501 51.75 37.0126 51.25 37.5376 50.75C37.8001 50.5 38.0626 50.25 38.3251 50.25C39.3751 49.75 40.4251 50 41.2126 50.75L41.4751 51C41.4751 51.25 41.7376 51.25 41.7376 51.5C41.7376 51.75 41.7376 51.75 42.0001 52C42.0001 52.25 42.0001 52.25 42.0001 52.5C42.0001 53.25 41.7376 53.75 41.2126 54.25ZM43.8376 49.25C43.3126 49.75 42.7876 50 42.0001 50C41.7376 50 41.2126 50 40.9501 49.75C40.6876 49.5 40.4251 49.5 40.1626 49.25C39.6376 48.75 39.3751 48.25 39.3751 47.5C39.3751 46.75 39.6376 46.25 40.1626 45.75C40.4251 45.5 40.6876 45.25 40.9501 45.25C42.0001 45 43.0501 45 43.8376 45.75C44.3626 46.25 44.6251 46.75 44.6251 47.5C44.6251 48.25 44.3626 48.75 43.8376 49.25Z"
                            fill="#1E2875" />
                        <path
                            d="M73.5 5H65.625C65.1 5 64.575 5.25 64.05 5.5L52.7625 14C50.925 15.5 49.875 17.5 49.875 20V34.75C55.3875 37.75 59.325 43.5 59.325 50C59.325 51.25 59.325 52.25 59.0625 53.5L62.7375 64.75C63.525 67.5 63.525 70.5 62.2125 73L64.3125 74.5C64.8375 74.75 65.3625 75 65.8875 75H73.7625C78.225 75 81.6375 71.75 81.6375 67.5V12.5C81.375 8.25 77.9625 5 73.5 5ZM72.7125 64.25C72.1875 64.75 71.6625 65 70.875 65C70.0875 65 69.5625 64.75 69.0375 64.25C68.5125 63.75 68.25 63.25 68.25 62.5C68.25 62.25 68.25 61.75 68.5125 61.5C68.775 61.25 68.775 61 69.0375 60.75C70.0875 59.75 71.6625 59.75 72.7125 60.75C72.975 61 73.2375 61.25 73.2375 61.5C73.2375 61.75 73.5 62.25 73.5 62.5C73.5 63.25 73.2375 63.75 72.7125 64.25ZM73.5 37.5C73.5 39 72.45 40 70.875 40C69.3 40 68.25 39 68.25 37.5V15C68.25 13.5 69.3 12.5 70.875 12.5C72.45 12.5 73.5 13.5 73.5 15V37.5Z"
                            fill="#1E2875" />
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-700 text-center mt-2 mb-6">PS4</h3>
                <p class="flex items-center gap-2 text-center"><span class="font-semibold text-blue-900">Price: </span>
                    12$/hour
                </p>
            </a-col>
            <a-col :lg="16" class="w-full">
                <!-- Timer Display -->
                <div class="space-y-4 mb-4">
                    <div :class="progress <= 20 ? 'bg-green-500' : progress <= 80 ? 'bg-yellow-500' : 'bg-red-600'"
                        class="timer-display">{{ formattedTime }}</div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div :class="progress <= 20 ? 'bg-green-500' : progress <= 80 ? 'bg-yellow-500' : 'bg-red-600'"
                            class="h-2 rounded-full transition-all overflow-hidden" :style="{ width: `${progress}%` }">
                        </div>


                    </div>
                </div>

                <!-- Time Info -->
                <div class="flex justify-between w-full mb-4 text-sm text-gray-600">
                    <div class="font-semibold py-2 px-4 rounded-md bg-gray-200">Start: {{ startTime }}</div>
                    <div class="font-semibold py-2 px-4 rounded-md bg-gray-200">End: {{ endTime }}</div>
                </div>

                <!-- Controls -->
                <div class="flex justify-center">
                    <a-button-group class="custom-button-group">
                        <a-button type="default"
                            class="flex items-center justify-center space-x-2 border-r-0 rounded-l-lg">
                            <span class="icon">
                                <svg width="24" height="23" viewBox="0 0 24 23" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_444_422)">
                                        <path
                                            d="M12 0C15.3145 0 18.3145 1.28776 20.4844 3.36914C22.6562 5.45052 24 8.32552 24 11.5C24 14.6764 22.6562 17.5514 20.4844 19.6309C18.3125 21.7122 15.3125 23 12 23C8.68555 23 5.68555 21.7122 3.51562 19.6309C1.34375 17.5514 0 14.6764 0 11.5C0 8.32365 1.34375 5.44865 3.51562 3.36914C5.68555 1.28776 8.68555 0 12 0ZM8.26172 7.38778H10.916V15.6141H8.26172V7.38778ZM13.084 7.38778H15.7383V15.6141H13.084V7.38778ZM19.0273 4.76546C17.2285 3.04159 14.7441 1.97656 12 1.97656C9.25586 1.97656 6.76953 3.04346 4.97266 4.76546C3.17383 6.48934 2.0625 8.8702 2.0625 11.5C2.0625 14.1298 3.17578 16.5125 4.97266 18.2345C6.77148 19.9584 9.25586 21.0234 12 21.0234C14.7441 21.0234 17.2305 19.9565 19.0273 18.2345C20.8262 16.5107 21.9375 14.1298 21.9375 11.5C21.9375 8.8702 20.8262 6.48747 19.0273 4.76546Z"
                                            fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_444_422">
                                            <rect width="24" height="23" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="text">stop</span>
                        </a-button>
                        <a-button type="default" class="flex items-center justify-center space-x-2 rounded-r-lg">
                            <span class="icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_444_425)">
                                        <path
                                            d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z"
                                            stroke="black" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M12 6V18" stroke="black" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M18 12H6" stroke="black" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_444_425">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </span>
                            <span class="text">add</span>
                        </a-button>
                    </a-button-group>
                </div>

            </a-col>
        </div>

    </a-col>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const totalSeconds = 60; // Total time in seconds (e.g., 1 hour)
const elapsedSeconds = ref(0);

// Timer logic
let timer;
onMounted(() => {
    timer = setInterval(() => {
        if (elapsedSeconds.value < totalSeconds) {
            elapsedSeconds.value++;
        }
    }, 1000);
});

onUnmounted(() => {
    clearInterval(timer);
    setInterval(() => {
        console.log(progress.value)
    }, 2000)
});

// Computed properties
const formattedTime = computed(() => {
    const hours = Math.floor(elapsedSeconds.value / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((elapsedSeconds.value % 3600) / 60)
        .toString()
        .padStart(2, "0");
    const seconds = (elapsedSeconds.value % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
});

const progress = computed(() => (elapsedSeconds.value / totalSeconds) * 100);

const startTime = "19:20"; // Static example time, replace with dynamic data if needed
const endTime = "19:22"; // Static example time
</script>

<style scoped>
.timer-card {
    width: 300px;
    max-width: 100%;
}

.control-button {
    padding: 8px 16px;
    color: white;
    transition: background 0.3s ease;
}

.timer-display {
    width: fit-content;
    padding: 12px 30px;
    background: #faba1829;
    border-radius: 8px;
}

.custom-button-group .ant-btn {
    border-color: #d1d5db;
    /* Tailwind gray-300 */
    padding: 1.1rem 1.25rem;
    /* Adjust spacing */
}

.custom-button-group .ant-btn:hover {
    border-color: #6b7280;
    /* Tailwind gray-500 */
}

.custom-button-group .icon {
    font-size: 1rem;
}

.custom-button-group .text {
    font-size: 1rem;
}
</style>