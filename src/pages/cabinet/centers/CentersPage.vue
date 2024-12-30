<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold py-6">Centers ({{ centersStore.centers.length }})</h1>
    <div>
      <a-input-search v-model:value="value" size="large" placeholder="Search" enter-button @search="onSearch"
        class="w-80 mr-4" />
      <button class="add-button shadow-lg"> Add Place </button>
    </div>
  </div>
  <div>
    <a-row :gutter="[24, 24]">
      <center-card :data="centersStore.centers" />
    </a-row>
  </div>
</template>

<script setup>
import { useCenterStore } from "@/stores/center.pinia.js";
import CenterCard from "./components/CenterCard.vue";


const centersStore = useCenterStore();

</script>

<style lang="scss" scoped></style>