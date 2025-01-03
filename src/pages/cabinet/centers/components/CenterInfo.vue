<template>
    <div class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold py-6">Center name</h1>
        <div>
            <a-input-search v-model:value="searchId" size="large" placeholder="Search" enter-button @search="onSearch"
                class="w-80 mr-4" />
            <button class="add-button shadow-lg"> Add Stuff </button>
        </div>
    </div>
    <a-row :gutter="[20, 20]">
        <TimerCard />
    </a-row>
</template>

<script setup>
import { ref } from "vue";
import TimerCard from "@/pages/cabinet/centers/components/TimerCard.vue";

// Reactive state for search
const searchId = ref("");

// Search function
const onSearch = () => {
    console.log("id == ", searchId.value);
};
</script>

<style scoped></style>