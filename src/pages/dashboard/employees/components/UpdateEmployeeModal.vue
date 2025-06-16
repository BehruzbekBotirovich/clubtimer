<script setup>
import useCore from "@/store/core.pinia.js";
import useEmployeesStore from "@/store/employee.pinia.js";
import {shallowRef} from "vue";
import {ref, reactive} from "vue";
import {storeToRefs} from "pinia";

const core = useCore();
const store = useEmployeesStore()
const {loadingUrl} = storeToRefs(core);

const props = defineProps({
  user: Object,
  modalKey: String,
})

const form = reactive({
  fullName: props.user.fullName,
  email: props.user.email,
  role: props.user.role,
  contact: props.user.contact,
})

function submitForm() {
  const formData = new FormData()
  formData.append('fullName', form.fullName)
  formData.append('email', form.email)
  formData.append('role', form.role)
  formData.append('contact', form.contact)

  store.updateEmployee(props.user._id, formData, props.modalKey)
}
</script>

<template>

  <a-form :model="form" class="w-[500px] p-4">
    <h3 class="font-bold text-xl">{{ $t('user.user_update') }}</h3>
    <a-form-item label="Full Name" name="fullName" :rules="[{ required: true }]">
      <a-input v-model:value="form.fullName" size="large"/>
    </a-form-item>

    <a-form-item label="Email" name="email" :rules="[{ required: true }]">
      <a-input v-model:value="form.email" size="large" type="email"/>
    </a-form-item>

    <a-form-item name="role" :rules="[{ required: true }]">
      <h3>Role</h3>
      <a-select v-model:value="form.role" :options="[
        { label: 'Admin', value: 'admin' },
        { label: 'Employee', value: 'employee' }
      ]"/>
    </a-form-item>

    <a-form-item label="Contact" name="contact" :rules="[{ required: true }]">
      <a-input v-model:value="form.contact" size="large"/>
    </a-form-item>
    <a-button
        @click="submitForm"
        :loading="loadingUrl.has('update-employee')"
        size="large"
        type="primary"
        class="!px-8 w-full">
      {{ $t('user.user_update') }}
    </a-button>
  </a-form>
</template>

<style scoped lang="scss">
</style>
