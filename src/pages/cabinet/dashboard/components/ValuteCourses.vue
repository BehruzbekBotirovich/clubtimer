<template>
    <div class="bg-white px-6 rounded-2xl shadow-md h-full">
        <div v-for="(currency, index) in displayedCurrencies" :key="index"
            class="flex items-center justify-between py-3 border-b last:border-b-0">
            <!-- Currency Icon and Name -->
            <div class="flex items-center gap-4">
                <div class="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-lg text-lg">
                    {{ currency.icon }}
                </div>
                <div>
                    <h4 class="font-bold text-gray-700">{{ currency.name }}</h4>
                    <p class="text-sm text-gray-500">{{ currency.code }}</p>
                </div>
            </div>

            <!-- Trend Graph -->
            <div class="w-32">
                <VueApexCharts :options="currency.chartOptions" :series="currency.series" type="line" height="40" />
            </div>

            <!-- Value and Change -->
            <div class="text-right">
                <p class="font-bold text-gray-800">{{ formatNumberWithSpaces(currency.rate.toFixed(2)) }}</p>
                <p :class="{
                    'text-green-500': currency.change > 0,
                    'text-red-500': currency.change < 0,
                }" class="text-sm">
                    <span v-if="currency.change > 0">↑</span>
                    <span v-else>↓</span>
                    {{ currency.change.toFixed(2) }}%
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import axios from "axios";

// List of currencies to display
const displayedCurrencies = ref([
    {
        name: "Dollar",
        code: "USD",
        icon: "$",
        rate: 0,
        change: 0,
        series: [{ name: "Trend", data: [] }],
        chartOptions: {
            chart: { toolbar: { show: false }, sparkline: { enabled: true } },
            stroke: { curve: "smooth", width: 2 },
            colors: ["#FF4D4F"],
            tooltip: { enabled: false },
        },
    },
    {
        name: "Euro",
        code: "EUR",
        icon: "€",
        rate: 0,
        change: 0,
        series: [{ name: "Trend", data: [] }],
        chartOptions: {
            chart: { toolbar: { show: false }, sparkline: { enabled: true } },
            stroke: { curve: "smooth", width: 2 },
            colors: ["#52C41A"],
            tooltip: { enabled: false },
        },
    },
    {
        name: "Bitcoin",
        code: "BTC",
        icon: "₿",
        rate: 0,
        change: 0,
        series: [{ name: "Trend", data: [] }],
        chartOptions: {
            chart: { toolbar: { show: false }, sparkline: { enabled: true } },
            stroke: { curve: "smooth", width: 2 },
            colors: ["#FF4D4F"],
            tooltip: { enabled: false },
        },
    },
    {
        name: "Rub",
        code: "RUB",
        icon: "₽",
        rate: 0,
        change: 0,
        series: [{ name: "Trend", data: [] }],
        chartOptions: {
            chart: { toolbar: { show: false }, sparkline: { enabled: true } },
            stroke: { curve: "smooth", width: 2 },
            colors: ["#52C41A"],
            tooltip: { enabled: false },
        },
    },
    {
        name: "Tenge",
        code: "KZT",
        icon: "₸",
        rate: 0,
        change: 0,
        series: [{ name: "Trend", data: [] }],
        chartOptions: {
            chart: { toolbar: { show: false }, sparkline: { enabled: true } },
            stroke: { curve: "smooth", width: 2 },
            colors: ["#52C41A"],
            tooltip: { enabled: false },
        },
    },
]);

// Fetch data from the exchange rate API
const fetchCurrencyData = async () => {
    try {
        const response = await axios.get("https://api.exchangeratesapi.io/v1/latest", {
            params: { access_key: "3343b8d9d183e8e05fe42c5415d9fab2" },
        });

        const rates = response.data.rates;
        const uzsRate = rates["UZS"]; // UZS rate from the API

        displayedCurrencies.value.forEach((currency) => {
            if (!rates[currency.code]) {
                console.warn(`Rate for ${currency.code} not available`);
                return;
            }

            // Update the rate in UZS
            const foreignRate = rates[currency.code];
            const prevRate = currency.rate || (uzsRate / foreignRate) * 0.99;
            currency.rate = uzsRate / foreignRate;

            // Calculate the percentage change
            currency.change = ((currency.rate - prevRate) / prevRate) * 100;

            // Simulate a trend graph with random data
            currency.series[0].data = Array.from({ length: 6 }, () =>
                (Math.random() * (currency.rate * 1.05 - currency.rate * 0.95) + currency.rate * 0.95).toFixed(2)
            );
        });
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
};

const formatNumberWithSpaces = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};


// Fetch the data on component mount
onMounted(() => {
    fetchCurrencyData();
    // setInterval(fetchCurrencyData, 60000)
});
</script>

<style scoped></style>
