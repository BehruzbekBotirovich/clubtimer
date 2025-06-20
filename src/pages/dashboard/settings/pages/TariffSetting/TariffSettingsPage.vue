<script setup>
import useTariffStore from "@/store/tariff.pinia.js";
import {onMounted} from "vue";

const tariffStore = useTariffStore();

onMounted(() => {
  tariffStore.getAllTariffs()
})
</script>

<template>

</template>

<style scoped lang="scss">

</style>