<template>
  <a-col v-for="el in data" :key="el._id" :lg="6">
    <a-card class="rounded-xl shadow-lg overflow-hidden border  border-gray-200" hoverable>
      <template #cover>
        <img alt="example" :src="el.img" style="aspect-ratio: 3/2; object-fit: cover;" />
      </template>
      <div>
        <h3 class="text-lg font-semibold mb-1">{{ el.name }}</h3>
        <p class="text-gray-700 text-sm  mb-2 flex items-center ml-1 gap-3">
<!--          <location-icon />-->
          <span> {{ el.location }}</span>
        </p>
        <p class="text-gray-700 text-sm  mb-4 flex items-center gap-2">
<!--          <profit-percent />-->
          Monthly: 1900
        </p>

        <div class="grid grid-cols-3 gap-2 text-center text-sm ">
          <div class="bg-gray-100 p-2 rounded-lg ">
            <div class="flex items-center justify-center ">
<!--              <ps-icon></ps-icon>-->
            </div>
            <p class="text-nowrap"> {{ (el.itemCounts?.PS4 || 0) + (el.itemCounts?.PS5 || 0) }} </p>
          </div>
          <div class="bg-gray-100 p-2 rounded-lg">
            <div class="flex items-center justify-center ">
<!--              <billiard-icon></billiard-icon>-->
            </div>
            <p class="text-nowrap"> {{ el?.itemCounts?.table || 0 }} </p>
          </div>
          <div class="bg-gray-100 p-2 rounded-lg">
            <div class="flex items-center justify-center ">
<!--              <caraoke-icon />-->
            </div>
            <p class="text-nowrap"> {{ el?.itemCounts?.karaoke || 0 }} </p>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div class=" mt-4 ">
        <router-link :to="{ name: 'center-info', params: { id: el._id } }">
          <a-button type="primary" class="w-full">Details</a-button>
        </router-link>
      </div>
    </a-card>
  </a-col>
</template>

<script setup>
// import PsIcon from '@/components/icons/PsIcon.vue';
// import BilliardIcon from '@/components/icons/BilliardIcon.vue';
// import CaraokeIcon from '@/components/icons/CaraokeIcon.vue';
// import ProfitPercent from '@/components/icons/ProfitPercent.vue';
// import LocationIcon from '@/components/icons/LocationIcon.vue';
import { defineProps, ref } from 'vue';
const props = defineProps({
  data: {
    type: Array,
    required: true
  },
});


</script>

<style scoped>
:deep(.ant-card .ant-card-body) {
  padding: 18px;
}
</style>
