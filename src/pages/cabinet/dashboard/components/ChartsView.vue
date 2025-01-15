<template>
    <!-- Bar Chart -->
    <a-col :lg="11">
        <div class="bg-white p-6 rounded-2xl shadow-md">
            <h3 class="text-lg font-bold mb-2">Overview</h3>
            <p class="text-sm text-gray-500 mb-4">Monthly Earning</p>
            <VueApexCharts type="bar" :options="barOptions" :series="barSeries" height="250px" />
        </div>
    </a-col>

    <!-- Donut Chart -->
    <a-col :lg="5">
        <div class="bg-white p-6 rounded-2xl shadow-md h-full">
            <h3 class="text-lg font-bold">Chart by Stuff Types</h3>
            <VueApexCharts type="donut" :options="donutOptions" :series="donutSeries" width="100%" height="auto" />
        </div>
    </a-col>

</template>

<script setup>
import VueApexCharts from "vue3-apexcharts";

const barOptions = {
    chart: {
        type: "bar",
        toolbar: { show: false },
    },
    plotOptions: {
        bar: {
            borderRadius: 5,
            columnWidth: "45%",
            distributed: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    tooltip: {
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            return `<div class="px-2 py-1 bg-black text-white rounded text-sm">
                  <strong>${series[seriesIndex][dataPointIndex]}%</strong>
                </div>`;
        },
    },
};

const barSeries = [
    {
        name: "Earning",
        data: [20, 40, 35, 50, 49, 60, 70, 91, 40, 30, 60, 70],
    },
];

const donutOptions = {
    labels: ["Billiard Board", "PlayStation", "Others"],
    chart: {
        type: "donut",
    },
    dataLabels: {
        enabled: true,
    },
    legend: {
        show: false, // Отключаем легенду
        position: "bottom",
        labels: {
            colors: ["#000"],
        },
    },
};

const donutSeries = [63, 25, 12];
</script>

<style scoped></style>