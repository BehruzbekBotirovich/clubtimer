<template>
  <div class="flex items-center justify-between my-4">
    <div class="flex items-center gap-2">
      <a-button type="default" @click="router.back()" size="large">
        <icon-arrow-back class="text-xl"/>
      </a-button>
      <h1 class="text-2xl font-semibold mb-0">{{ centerName }}</h1>
    </div>
    <div class="flex items-center justify-between">
      <a-button type="primary" size="large">
        <template #icon>
          <icon-device-plus class="text-xl mr-1"/>
        </template>
        Qurilma qoshish
      </a-button>
    </div>
  </div>
  <a-row :gutter="[20, 20]">
    <TimerCard v-for="item in store.devices" :device="item" :key="item._id"/>
  </a-row>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import useDevicesStore from "@/store/devices.pinia.js";

import TimerCard from "@/pages/dashboard/centers/views/OneCenterPage/components/TimerCard.vue";
import IconDevicePlus from "@/components/icons/IconDevicePlus.vue";
import IconArrowBack from "@/components/icons/IconArrowBack.vue";

const route = useRoute();
const router = useRouter();
const centerName = route.query.center;
const store = useDevicesStore();
const building_id = route.params.id
onMounted(() => {
  const params = {
    building_id
  }
  store.getAllDevices(params)
})

</script>

<style scoped></style>