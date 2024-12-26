<template>
    <a-row :gutter="[30,30]">
        <CountsComponent />
        <TimeWidget />
    </a-row>
    
</template>

<script setup>
import CountsComponent from './components/CountsComponent.vue';
import TimeWidget from './components/TimeWidget.vue';
</script>

<style></style>