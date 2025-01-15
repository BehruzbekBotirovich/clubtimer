<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold py-6">Center name</h1>
    <div>
      <a-input-search v-model:value="searchId" size="large" placeholder="Search" enter-button @search="onSearch"
                      class="w-80 mr-4"/>
      <button class="add-button shadow-lg"> Add Stuff</button>
    </div>
  </div>
  <a-row :gutter="[20, 20]">
    <TimerCard
        v-for="timer in timers"
        :key="timer.id"
        :price="timer.price"
        :type="timer.type"
        :startTime="timer.startTime"
        :endTime="timer.endTime"
        :name="timer.name"
    />
  </a-row>
</template>

<script setup>
import {ref} from "vue";
import TimerCard from "@/pages/cabinet/centers/components/TimerCard.vue";

// Reactive state for search
const searchId = ref("");

// Search function
const onSearch = () => {
  console.log("id == ", searchId.value);
};

const timers = [
  {id: 1, price: 12, type: 'console', name: "PS4 1", startTime: "14:00", endTime: "15:00"},
  {id: 2, price: 15, type: 'console', name: "PS4 2", startTime: "15:30", endTime: "16:30"},
  {id: 3, price: 10, type: 'console', name: "PS3 3", startTime: "13:00", endTime: "13:20"},
  {id: 4, price: 40, type: 'board', name: "Board 1", startTime: "13:00", endTime: "13:20"},
  {id: 5, price: 30, type: 'board', name: "Board 2", startTime: "13:00", endTime: "13:20"},
  {id: 6, price: 100, type: 'karaoke', name: "Room 1", startTime: "13:00", endTime: "13:20"},

];

</script>

<style scoped></style>