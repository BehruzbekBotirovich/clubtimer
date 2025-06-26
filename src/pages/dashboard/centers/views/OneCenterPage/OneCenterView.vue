<template>
  <div class="flex items-center justify-between my-4">
    <div class="flex items-center gap-2">
      <a-button type="default" @click="router.back()" size="large">
        <icon-arrow-back class="text-xl"/>
      </a-button>
      <h1 class="text-2xl font-semibold mb-0">{{ centerName }}</h1>
    </div>
    <div class="flex items-center justify-between">
      <a-button type="primary" size="large" @click="openCreateDeviceModal" v-if="userPinia.user.role === 'admin'">
        <template #icon>
          <icon-device-plus class="text-xl mr-1"/>
        </template>
        Qurilma qoshish
      </a-button>
    </div>
  </div>
  <a-row :gutter="[20, 20]">
    <a-skeleton :loading="loadingUrl.has('get-devices')"></a-skeleton>
    <DeviceCardTimer v-for="item in store.devices" :device="item" :key="item._id"/>
  </a-row>
</template>

<script setup>
import {onMounted, ref, shallowRef} from "vue";
import {useRoute, useRouter} from "vue-router";
import useDevicesStore from "@/store/devices.pinia.js";
import useCore from "@/store/core.pinia.js";
import DeviceCardTimer from "@/pages/dashboard/centers/views/OneCenterPage/components/DeviceCard.vue";
import IconDevicePlus from "@/components/icons/IconDevicePlus.vue";
import IconArrowBack from "@/components/icons/IconArrowBack.vue";
import {storeToRefs} from "pinia";
import CreateDeviceModal from "@/pages/dashboard/centers/views/OneCenterPage/components/CreateDeviceModal.vue";
import useModal from "@/store/modal.pinia.js";
import useUser from '@/store/user.pinia.js'

const userPinia = useUser()
const modal = useModal()
const core = useCore();
const route = useRoute();
const router = useRouter();
const {loadingUrl} = storeToRefs(core)
const centerName = route.query.center;
const store = useDevicesStore();
const building_id = route.params.id
onMounted(() => {
  const params = {
    building_id
  }
  store.getAllDevices(params)
})

function openCreateDeviceModal() {
  modal.open({
    component: shallowRef(CreateDeviceModal),
    props: {
      building_id
    }
  })
}
</script>

<style scoped></style>