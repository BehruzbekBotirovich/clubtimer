<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'
import useModal from '@/store/modal.pinia.js'
import OtpInputComponent from '@/components/OtpInputComponent.vue'
import RetryTimerComponent from '@/components/RetryTimerComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue'

const { t } = useI18n()
const emits = defineEmits(['close', 'success'])
const props = defineProps({
  modalKey: [Number, String],
  url: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    default: {}
  },
  otpData: {
    type: Object,
    required: true
  },
  success: String
})
const modalPinia = useModal()
const corePinia = useCore()

const reOtpKey = ref(null)
const loading = ref(false)
const otpStatus = ref(null)
const finished = ref(false)
const otp = ref()

const formattedMessage = computed(() => {
  let rawMessage
  rawMessage = t('otp_component.a_6_dig_code_has_ben_send_your_phone_number', {
    phone_number: 'phone_number'
  })
  return rawMessage.replace(
    'phone_number',
    `<span class="text-primary">${props?.otpData?.phoneNumber}</span>`
  )
})

function sendOtp() {
  if (otp.value) {
    console.log(otp.value)
    otpStatus.value = null
    loading.value = true
    api({
      url: props.url,
      method: 'POST',
      data: {
        otpKey: reOtpKey.value || props.otpData?.otpKey,  // otp key from backend generated
        otpValue: otp.value, // 6ta raqam input 
        ...props.data
      }
    })
      .then(({ data }) => {
        modalPinia.close(props.modalKey)
        emits('success', data)
        corePinia.setToast({
          type: 'success',
          message: props.success || t('notification_component.success')
        })
      })
      .catch((error) => {
        corePinia.switchStatus(error)
        otpStatus.value = 'error'
      })
      .finally(() => {
        loading.value = false
      })
  } else {
    otpStatus.value = 'error'
  }
}

function resendOtp() {
  const core = useCore()
  core.loadingUrl.add('resent-otp')
  loading.value = true
  finished.value = false
  api({
    url: 'auth/resend-otp/',
    method: 'GET',
    pk: props.otpData.otpKey || reOtpKey.value,
  })
    .then(({ data }) => {
      corePinia.setToast({
        type: 'success',
        message: t('otp_component.resended_message')
      })
      reOtpKey.value = data.otpKey;
    })
    .catch((error) => {
      core.switchStatus(error)
    })
    .finally(() => {
      loading.value = false
      core.loadingUrl.delete('resent-otp')
    })
}
</script>

<template>
  <modal-card-component :loading="loading" :modal-key="modalKey">
    <template #body>
      <div class="min-h-[250px] w-[400px] flex flex-col justify-center">
        <h1 class="otp-title text-2xl text-center text-700 text-body">
          {{ $t('otp_component.enter_a_code') }}
        </h1>
        <p class="otp-description text-base text-muted text-center text-600" v-html="formattedMessage"></p>
        <a-card class="sub-card" :bordered="false">
          <div class="mb-2">
            <otp-input-component v-model:value="otp" v-model:status="otpStatus" @enter="sendOtp" />
          </div>
        </a-card>
        <div class="justify-start">
          <template v-if="finished">
            <a-button @click="resendOtp" :loading="loading" type="link" class="resend_code">
              {{ $t('otp_component.resend_code') }}
            </a-button>
          </template>
          <template v-else>
            <div class="mt-2 text-500 text-muted">
              <retry-timer-component :second="otpData?.retrySecond || 120" @finished="finished = true" />
            </div>
          </template>
        </div>
      </div>
    </template>
    <template #footer>
      <div>
        <a-button @click="sendOtp" type="primary" size="large" :disabled="otp?.length !== 6" class="login-btn w-full">
          {{ $t('otp_component.send') }}
        </a-button>
      </div>
    </template>
  </modal-card-component>
</template>

<style scoped lang="scss"></style>
