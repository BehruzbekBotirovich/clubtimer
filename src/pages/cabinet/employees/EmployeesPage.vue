<template>
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold py-6">Employees (9)</h1>
        <div>
            <a-input-search v-model:value="value" size="large" placeholder="Search" enter-button @search="onSearch"
                class="w-80 mr-4" />
            <button class="add-button shadow-lg"> Add Person </button>
        </div>
    </div>
    <div>
        <EmployeeCard :data="employeeStore.employees"> </EmployeeCard>

    </div>
</template>

<script setup>
import { useEmployeesStore } from '@/stores/employee.pinia';
import EmployeeCard from './components/EmployeeCard.vue';
const employeeStore = useEmployeesStore()
</script>