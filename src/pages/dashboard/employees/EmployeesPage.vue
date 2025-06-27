<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold py-6">
      Employees ({{ employeeStore.employees.length }})
    </h1>
    <div class="flex items-center">
      <a-input-search
          v-model:value="search"
          size="large"
          placeholder="Search"
          enter-button
          @search="onSearch"
          class="w-80 mr-2"
      />
      <a-button @click="openCreateModal" type="primary" size="large">
        <template #icon>
          <icon-user-add class="text-xl mr-1"/>
        </template>
        {{ $t('user.user_add') }}
      </a-button>
    </div>
  </div>

  <page-loader-component :loading="loadingUrl.has('get-employees')">
    <EmployeeCard :data="employeeStore.employees"/>
    <div class="flex justify-end mt-4">
      <a-pagination
          :current="currentPage"
          :pageSize="limit"
          :total="total"
          @change="onPageChange"
          show-size-changer
          @showSizeChange="onPageSizeChange"
          :pageSizeOptions="['10', '20', '50', '100']"
      />
    </div>
  </page-loader-component>
</template>

<script setup>
import {ref, shallowRef, onMounted} from 'vue'
import useEmployeesStore from '@/store/employee.pinia.js'
import CreateEmployeeModal from "@/pages/dashboard/employees/components/CreateEmployeeModal.vue"
import EmployeeCard from './components/EmployeeCard.vue'
import useCore from "@/store/core.pinia.js"
import useModal from '@/store/modal.pinia.js'
import {storeToRefs} from "pinia"
import PageLoaderComponent from "@/components/PageLoaderComponent.vue";

const search = ref('')
const currentPage = ref(1)
const limit = ref(20)
const total = ref(0)

const employeeStore = useEmployeesStore()
const modal = useModal()
const corePinia = useCore()
const {loadingUrl} = storeToRefs(corePinia)

function fetchEmployees() {
  const params = {
    search: search.value || undefined,
    page: currentPage.value,
    limit: limit.value
  }

  employeeStore.getAllEmployees(params)
}

onMounted(() => {
  if (employeeStore.employees.length === 0) {
    fetchEmployees()
  }
})

function openCreateModal() {
  modal.open({
    component: shallowRef(CreateEmployeeModal)
  })
}

function onSearch() {
  currentPage.value = 1
  fetchEmployees()
}

function onPageChange(page) {
  currentPage.value = page
  fetchEmployees()
}

function onPageSizeChange(current, size) {
  limit.value = size
  currentPage.value = 1
  fetchEmployees()
}
</script>
