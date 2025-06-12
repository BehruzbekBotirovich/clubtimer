<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold py-6">Employees ({{ employeeStore.employees.length }})</h1>
    <div class="flex items-center">
      <a-input-search v-model:value="value" size="large" placeholder="Search" enter-button @search="onSearch"
                      class="w-80 mr-2"/>
      <a-button @click="openCreateModal" type="primary" size="large">
        <template #icon>
          <icon-user-add class="text-xl mr-1"/>
        </template>
        {{ $t('user.user_add') }}
      </a-button>
    </div>
  </div>
  <a-spin :spinning="loadingUrl.has('get-employees')">
    <EmployeeCard :data="employeeStore.employees"/>
  </a-spin>
</template>

<script setup>
import useEmployeesStore from '@/store/employee.pinia.js';
import EmployeeCard from './components/EmployeeCard.vue';
import {onMounted, shallowRef} from "vue";
import IconTripleUser from "@/components/icons/IconTripleUser.vue";
import IconUserAdd from "@/components/icons/IconUserAdd.vue";
import useModal from '@/store/modal.pinia.js'
import CreateEmployeeModal from "@/pages/dashboard/employees/components/CreateEmployeeModal.vue";
import useCore from "@/store/core.pinia.js";
import {storeToRefs} from "pinia";

const employeeStore = useEmployeesStore()
const modal = useModal()
const corePinia = useCore()
const {loadingUrl} = storeToRefs(corePinia)
onMounted(() => {
  employeeStore.getAllEmployees()
})

function openCreateModal() {
  modal.open({
    component: shallowRef(CreateEmployeeModal),
  })
}
</script>