<script setup>
import {ref, defineProps, shallowRef} from 'vue'
import dayjs from 'dayjs'
import useEmployeesStore from "@/store/employee.pinia.js";
import useCore from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";
// Подключаем UTC и Timezone
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import IconThreeDots from "@/components/icons/IconThreeDots.vue";
import IconDelete from "@/components/icons/IconDelete.vue";
import IconUserOff from "@/components/icons/IconUserOff.vue";
import IconUserCheck from "@/components/icons/IconUserCheck.vue";
import {storeToRefs} from "pinia";
import UpdateEmployeeModal from "@/pages/dashboard/employees/components/UpdateEmployeeModal.vue";

dayjs.extend(utc)
dayjs.extend(timezone)

const store = useEmployeesStore()
const core = useCore()
const modal = useModal()
const {loadingUrl} = storeToRefs(core)
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const open = ref(false)
const showModal = (id) => {
  open.value = true
  console.log('Open modal for id:', id)
}

function openEditModal(user) {
  modal.open({
    component: shallowRef(UpdateEmployeeModal),
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
        <a-avatar size="large" :src="'http://localhost:5000'+ el.avatar_url"/>
        <div>
          <div class="text-base font-semibold">{{ el.fullName }}</div>
          <div class="text-sm text-gray-500">{{ el.email }}</div>
        </div>
      </a-col>
      <!--      <a-col :lg="4">-->
      <!--        <div class="text-sm text-gray-400 text-left">place</div>-->
      <!--        <div class=" text-gray-600 text-left">{{ el.location }}</div>-->
      <!--      </a-col>-->
      <a-col :lg="2">
        <div class="text-sm text-gray-400 text-left">Tizimga qoshildi</div>
        <div class="text-gray-600 text-left">
          {{ dayjs.utc(el.createdAt).tz('Asia/Tashkent').format('DD.MM.YYYY HH:mm') }}
        </div>
      </a-col>
      <a-col :lg="3">
        <div class="text-sm text-gray-400 text-left">Telefon raqami</div>
        <div class="text-gray-600 text-left">{{ el.contact }}</div>
      </a-col>
      <a-col :lg="2">
        <div class="text-xs text-gray-400 text-left mb-1">Status</div>
        <a-tag :color="el.isActive ? 'green' : 'red'" size="large"> {{ el.isActive ? 'Active' : 'Disabled' }}</a-tag>
      </a-col>
      <!--      <a-col :lg="3">-->
      <!--        <div class="text-xs text-gray-400 text-left">Working time</div>-->
      <!--        <div class="text-sm text-gray-600 text-left">{{ el.working_time }}</div>-->
      <!--      </a-col>-->
      <!-- Actions -->
      <a-col class="flex gap-2" :lg="2">
        <a-button @click="openEditModal(el)" type="primary">
          <template #icon>
            <icon-edit class="text-lg"/>
          </template>
        </a-button>
        <a-popconfirm
            v-if="!el.isActive"
            :title="$t('Вы действительно хотите активировать пользователя?')"
            :ok-text="$t('Да')"
            :cancel-text="$t('Отмена')"
            @confirm="store.reactiveUser(el._id)"
        >
          <a-button type="primary" class="bg-green">
            <template #icon>
              <icon-user-check class="text-lg"/>
            </template>
          </a-button>
        </a-popconfirm>

        <a-popconfirm
            v-else
            :title="$t('Вы действительно хотите занова деактивировать пользователя?')"
            :ok-text="$t('Да')"
            :cancel-text="$t('Отмена')"
            @confirm="store.reactiveUser(el._id)"
        >
          <a-button type="primary" class="bg-red">
            <template #icon>
              <icon-user-off class="text-lg"/>
            </template>
          </a-button>
        </a-popconfirm>

      </a-col>

    </a-row>

  </div>

</template>

<style scoped>

</style>
