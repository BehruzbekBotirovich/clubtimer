<template>
  <a-col v-for="el in centers" :key="el._id" :lg="6">
    <a-card class="rounded-xl shadow-lg overflow-hidden border relative  border-gray-200" :hoverable="false">
      <template #cover>
        <a-image alt="example" :src="URL + el.image_url" style="aspect-ratio: 3/2; object-fit: cover;"/>
      </template>
      <div class="text-base">
        <h3 class="text-xl font-semibold mb-1">{{ el.name }}</h3>
        <p class="text-gray-700 flex items-center  gap-1">
          <icon-location class="text-xl"/>
          <span>Manzil:  </span>
          <span class="font-semibold"> {{ el.location }}</span>
        </p>
        <p class="text-gray-700 flex items-center  gap-1">
          <icon-clock-time class="text-xl"/>
          <span>Ishlash vaqti: </span>
          <span class="font-semibold"> {{ el.openCloseTime }}</span>
        </p>
        <p class="text-gray-700 mb-2 flex items-center gap-1">
          <icon-map-point class="text-xl text-primary"/>
          <a-typography-link :href="`https://www.google.com/maps?q=${el.coordinates[0]},${el.coordinates[1]}`"
                             target="_blank">
            Haritada ochish
          </a-typography-link>
        </p>
      </div>
      <div class=" mt-4 ">
        <router-link :to="`centers/devices/${el._id}?center=${el.name}`">
          <a-button type="primary" class="w-full">Kirish</a-button>
        </router-link>
      </div>


      <a-dropdown :trigger="['click']" v-if="user.role==='admin'">
        <a-button type="default" class="absolute right-2 top-2">
          <template #icon>
            <icon-three-dots class="text-xl"/>
          </template>
        </a-button>
        <template #overlay>
          <a-menu class="w-fit">
            <a-menu-item key="1" class="flex items-center gap-2">
              <div @click="openEditModal(el)" class="flex items-center gap-2">
                <icon-edit/>
                <span> {{ $t('edit') }}</span>
              </div>
            </a-menu-item>
            <a-menu-item key="0">
              <a-popconfirm :title="$t('center.center_delete_confirm')"
                            class="flex items-center gap-2" :ok-text="$t('header_component.yes')"
                            :cancel-text="$t('header_component.no')" @confirm="deleteAccount(el._id)"
                            placement="left">
                <icon-delete/>
                <span>{{ $t('delete') }}</span>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-card>

  </a-col>
</template>

<script setup>
import {defineProps, ref, shallowRef} from 'vue';
import useModal from '@/store/modal.pinia.js';
import useUser from "@/store/user.pinia.js";
import IconLocation from "@/components/icons/IconLocation.vue";
import IconMapPoint from "@/components/icons/IconMapPoint.vue";
import IconClockTime from "@/components/icons/IconClockTime.vue";
import IconThreeDots from "@/components/icons/IconThreeDots.vue";
import UpdateCenterModal from "@/pages/dashboard/centers/components/UpdateCenterModal.vue";

const URL = import.meta.env.VITE_APP_BASE_URL || "https://clubtimer-back.onrender.com"
const user = useUser();
const modal = useModal();
const props = defineProps({
  centers: {
    type: Array,
    required: true
  },
});

function openEditModal(center) {
  modal.open({
    component: shallowRef(UpdateCenterModal),
    props: {
      center: center
    }
  })
}

</script>

<style scoped>
:deep(.ant-card .ant-card-body) {
  padding: 18px;
}
</style>
