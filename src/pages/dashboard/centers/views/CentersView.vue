<template>
  <div class="flex items-center justify-between mb-2">
    <h1 class="text-2xl font-semibold py-4">Centers ({{ centersStore.centers.length }})</h1>
    <div>
      <a-button v-if="userPinia.user.role == 'admin'" @click="openCreateModal" type="primary">
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
      <card-sceleton-component v-if="loadingUrl.has('get-buildings')"/>
    </a-row>
  </div>
</template>

<script setup>
import {onMounted, shallowRef} from "vue";
import useCenterStore from "@/store/center.pinia.js";
import useModal from '@/store/modal.pinia.js'
import useCore from "@/store/core.pinia.js";
import CenterCard from "../components/CenterCard.vue";
import IconCenterBuilding from "@/components/icons/IconCenterBuilding.vue";
import CreateCenterModal from "@/pages/dashboard/centers/components/CreateCenterModal.vue";
import {storeToRefs} from "pinia";
import CardSceletonComponent from "@/components/CardSceletonComponent.vue";
import useUser from "@/store/user.pinia.js";

const userPinia = useUser();
const modal = useModal();
const core = useCore();
const {loadingUrl} = storeToRefs(core)
const centersStore = useCenterStore();
onMounted(() => {
  if (centersStore.centers.length === 0) {
    centersStore.getBuildings()
  }
})

function openCreateModal() {
  modal.open({
    component: shallowRef(CreateCenterModal)
  })
}

</script>

<style lang="scss" scoped></style>