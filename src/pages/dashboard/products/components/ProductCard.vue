<script setup>
import {ref, defineProps, shallowRef} from 'vue'
import dayjs from 'dayjs'
import useProductStore from '@/store/product.pinia.js'
import useCore from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";
// Подключаем UTC и Timezone
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import IconDelete from "@/components/icons/IconDelete.vue";
import {storeToRefs} from "pinia";
import EditProductModal from "@/pages/dashboard/products/components/EditProductModal.vue";
import useUser from "@/store/user.pinia.js";

dayjs.extend(utc)
dayjs.extend(timezone)

const userPinia = useUser()
const store = useProductStore()
const core = useCore()
const modal = useModal()
const {loadingUrl} = storeToRefs(core)
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
const URL = import.meta.env.VITE_APP_BASE_URL || 'https://clubtimer-back.onrender.com'

function openEditModal(user) {
  modal.open({
    component: shallowRef(EditProductModal),
    props: {
      user: user,
    }
  })
}
</script>

<template>
  <div class="space-y-2">
    <!-- cards -->
    <a-row v-for="el in data" :key="el.id" :gutter="[0, 10]"
           class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <a-col :lg="6" class="flex items-center gap-4">
        <a-image :width="50" :height="50" class="object-cover" :src="URL+ el.product_img"/>
        <div class="text-base font-semibold">
          <div>{{ el.name }}</div>
          <div class="text-primary"><span class="text-base text-gray-500">Narxi: </span>{{ el.price }} sum</div>
        </div>
      </a-col>
      <a-col :lg="3">
        <div class="text-sm text-gray-400 text-left">{{ $t('category') }}</div>
        <div class="text-gray-600 text-left">{{ $t(el.category) }}</div>
      </a-col>
      <a-col :lg="4">
        <div class="text-sm text-gray-400 text-left">Tizimga qoshildi</div>
        <div class="text-gray-600 text-left">
          {{ dayjs.utc(el.createdAt).tz('Asia/Tashkent').format('DD.MM.YYYY HH:mm') }}
        </div>
      </a-col>
      <a-col :lg="4">
        <div class="text-sm text-gray-400 text-left">Ohirgi yangilanish</div>
        <div class="text-gray-600 text-left">
          {{ dayjs.utc(el.updatedAt).tz('Asia/Tashkent').format('DD.MM.YYYY HH:mm') }}
        </div>
      </a-col>
      <a-col v-if="userPinia.user.role=='admin'" class="flex gap-2" :lg="2">
        <a-button @click="openEditModal(el)" type="primary">
          <template #icon>
            <icon-edit class="text-lg"/>
          </template>
        </a-button>
        <a-popconfirm
            :title="$t('Вы действительно хотите удалить продукт?')"
            :ok-text="$t('yes')"
            :cancel-text="$t('no')"
            @confirm="store.deleteProduct(el._id)"
        >
          <a-button type="primary" class="bg-red">
            <template #icon>
              <icon-delete class="text-lg"/>
            </template>
          </a-button>
        </a-popconfirm>
      </a-col>
    </a-row>
  </div>

</template>

<style scoped>

</style>
