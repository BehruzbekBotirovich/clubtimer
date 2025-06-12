<script setup>
import {reactive, ref} from 'vue'
import {formatPhoneNumber, reformatPhoneNumber} from '@/helpers/index.js'
import {useValidator} from '@/composables/index.js'
import useAuth from '@/store/auth.pinia.js'
import useCore from '@/store/core.pinia.js'
import {useI18n} from 'vue-i18n'

const {requiredField, phoneNumberValidator} = useValidator()
const {t} = useI18n()
const coreStore = useCore()
const authStore = useAuth()

const formRef = ref()
const form = reactive({
  email: '',
  password: ''
})

async function inputTypingEvent() {
  form.username = await formatPhoneNumber(form.username)
}

function submitForm() {
  formRef.value
      .validate()
      .then((valid) => {
        const data = {...form,}
        authStore.loginWithPassword(data)
      })
      .catch(() => {
      })
}
</script>

<template>
  <a-card class="w-[460px] border-none">

    <a-form ref="formRef" :model="form">
      <div class="flex gap-2">
        <div class="flex-grow">
          <a-form-item :rules="[requiredField]" label="email" name="email">
            <a-input size="large" type="email" v-model:value="form.email" @keydown.enter="submitForm"/>
          </a-form-item>
        </div>
      </div>

      <a-form-item :rules="[requiredField]" name="password" :label="$t('auth_view.password')">
        <a-input-password autocomplete="" @keydown.enter="submitForm" size="large" v-model:value="form.password"/>
      </a-form-item>
    </a-form>
    <div class="flex justify-end items-center gap-2 mt-4">
      <a-button type="text" size="large" class="text-primary">
        {{ t('auth_view.reset_password') }}
      </a-button>
      <a-button @click="submitForm"   :loading="coreStore.isLoading('get-token')" size="large" type="primary"
                class="!px-8 text-lg">
        {{ t('auth_view.login') }}
      </a-button>
    </div>


  </a-card>
</template>

<style scoped lang="scss"></style>
