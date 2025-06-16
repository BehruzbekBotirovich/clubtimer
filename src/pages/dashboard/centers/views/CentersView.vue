<template>
  <div class="flex items-center justify-between mb-2">
    <h1 class="text-2xl font-semibold py-4">Centers ({{ centersStore.centers.length }})</h1>
    <div>
      <a-button @click="openCreateModal" type="primary">
        <template #icon>
          <icon-center-building class="mr-2 text-xl"/>
        </template>
        Add Place
      </a-button>
    </div>
  </div>
  <div>
    <a-row :gutter="[20, 20]">
      <center-card :centers="centersStore.centers"/>
    </a-row>
  </div>
</template>

<script setup>
import {onMounted, shallowRef} from "vue";
import useCenterStore from "@/store/center.pinia.js";
import useModal from '@/store/modal.pinia.js'

import CenterCard from "../components/CenterCard.vue";
import IconCenterBuilding from "@/components/icons/IconCenterBuilding.vue";
import CreateCenterModal from "@/pages/dashboard/centers/components/CreateCenterModal.vue";

const modal = useModal();
const centersStore = useCenterStore();
onMounted(() => {
  centersStore.getBuildings()
})

function openCreateModal() {
  modal.open({
    component: shallowRef(CreateCenterModal)
  })
}

</script>

<style lang="scss" scoped></style>