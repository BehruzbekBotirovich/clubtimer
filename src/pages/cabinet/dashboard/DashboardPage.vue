<template>
    <a-row :gutter="[24, 24]">
        <CountsComponent />
        <TimeWidget />
    </a-row>
    <a-row :gutter="[24, 24]" class="py-6">
        <charts-view />
        <a-col :lg="8">
            <ValuteCourses></ValuteCourses>
        </a-col>
    </a-row>

    <a-row :gutter="[24, 24]">
        <a-col :lg="16">
            <active-list></active-list>
        </a-col>
    </a-row>

</template>

<script setup>
import CountsComponent from './components/CountsComponent.vue';
import TimeWidget from './components/TimeWidget.vue';
import ChartsView from './components/ChartsView.vue';
import ValuteCourses from './components/ValuteCourses.vue';
import ActiveList from './components/ActiveList.vue';
</script>

<style></style>