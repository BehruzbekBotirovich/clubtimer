<script setup>
import { ref } from 'vue'
const dataSource = [
    {
        key: '1',
        image: new URL('@/assets/removeit/club2.jpg', import.meta.url).href,
        name: 'Name',
        description: 'description place',
        stock: '12 in stock',
        income: '$ 45',
        orders: 22,
    },
    {
        key: '2',
        image: new URL('@/assets/removeit/club3.jpg', import.meta.url).href,
        name: 'Name',
        description: 'location',
        stock: '6 in stock',
        income: '$ 41.2',
        orders: 12,
    },
    {
        key: '3',
        image: new URL('@/assets/removeit/club4.jpg', import.meta.url).href,
        name: 'Name',
        description: 'location',
        stock: '10 in stock',
        income: '$ 35.2',
        orders: 14,
    },
    {
        key: '4',
        image: new URL('@/assets/removeit/club5.jpg', import.meta.url).href,
        name: 'Name',
        description: 'location',
        stock: '11 in stock',
        income: '$ 30',
        orders: 12,
    },
];

const columns = [
    {
        title: 'Center Name',
        key: 'name',
        dataIndex: 'name',
    },
    {
        title: 'Stuffs count',
        dataIndex: 'stock',
        key: 'stock',
        align: 'center',
    },
    {
        title: 'Income',
        dataIndex: 'income',
        key: 'income',
        align: 'center',
    },
    {
        title: 'Orders',
        dataIndex: 'orders',
        key: 'orders',
        align: 'center',
    },
];
const selectedTime = ref(1)

const timeOptions = [
    { value: 1, label: "last day" },
    { value: 2, label: 'Mothly' },
    { value: 3, label: 'Weakly' },
    { value: 4, label: 'for last 10 days' },
]
const setFilterQuery = () => {
    console.log("changed")
}
</script>

<template>
    <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">The most active</h2>
            <div class="flex items-center gap-4">
                <a-select @change="setFilterQuery" v-model:value="selectedTime" show-search class="w-60"
                    :options="timeOptions"></a-select>
            </div>
        </div>

        <!-- Table -->
        <a-table :dataSource="dataSource" :columns="columns" rowKey="key" :border="false" :pagination='false'>
            <template #bodyCell="{ column, record }">
                <div v-if="column.key === 'name'" class="flex items-center gap-4">
                    <div class="w-16 h-12 rounded-lg overflow-hidden">
                        <img :src="record.image" alt="avatar" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div class="font-semibold text-sm">{{ record.name }}</div>
                        <div class="text-xs text-gray-500">{{ record.description }}</div>
                    </div>
                </div>
            </template>
        </a-table>
    </div>
</template>

<style scoped>
.shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
