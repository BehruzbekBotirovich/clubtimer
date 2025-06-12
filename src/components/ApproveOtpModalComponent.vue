<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import useCore from '@/store/core.pinia.js'
import OtpInputComponent from '@/components/OtpInputComponent.vue'
import RetryTimerComponent from '@/components/RetryTimerComponent.vue'
import ModalCardComponent from '@/components/ModalCardComponent.vue'
import { storeToRefs } from 'pinia'
import useSign from '@/store/global/sign.pinia.js'

const { t } = useI18n()
const emits = defineEmits(['send', 'resent'])
const props = defineProps({
  modalKey: String,
  title: String
})

const signStore = useSign()

const { loadingUrl } = storeToRefs(useCore())
const { otpData, otpStatus, finished } = storeToRefs(signStore)

const otp = ref()

const formattedMessage = computed(() => {
  let rawMessage
  if (otpData.value?.maskedPhoneNumber || otpData.value?.maskedPhoneNumber) {
    let rawMessage = t(
      'sign_with_eimzo_component.a_6_dig_code_has_ben_send_your_phone_number',
      {
        phone_number: 'phone_number'
      }
    )
    return rawMessage.replace(
      'phone_number',
      `<span class="text-primary">${otpData.value?.maskedPhoneNumber || otpData?.value?.maskedPhoneNumber}</span>`
    )
  } else if (otpData.value?.email || otpData.value?.maskedEmail) {
    let rawMessage = t(
      'sign_with_eimzo_component.a_6_dig_code_has_ben_send_your_email',
      {
        email: '{email}'
      }
    )
    return rawMessage.replace(
      '{email}',
      `<span class="text-primary">${otpData.value?.email || otpData.value?.maskedEmail}</span>`
    )
  }
})

function sendOtp() {
  if (otp.value) {
    otpStatus.value = null
    emits('send', { otp: otp.value, modalKey: props.modalKey })
  } else {
    otpStatus.value = 'error'
  }
}

function resendOtp() {
  otp.value = null
  otpStatus.value = null
  emits('resent')
}

onBeforeUnmount(() => {
  otpData.value = {}
  otp.value = null
  otpStatus.value = null
  signStore.$reset()
})
</script>

<template>
  <modal-card-component
    :title="$t('sign_with_eimzo_component.otp')"
    :description="`${$t('sign_with_eimzo_component.title')} • ${title}`"
    :modal-key="modalKey"
    :loading="loadingUrl.has('resent-otp')"
    :opacity="false"
  >
    <template #body>
      <div
        class="min-h-[450px] lg:w-[560px] max-w-[560px] !max-h-[600px] flex flex-col"
      >
        <h1 class="text-[32px] leading-9 font-bold text-center">
          {{ $t('sign_with_eimzo_component.enter_a_code') }}
        </h1>
        <p
          class="otp-description text-base text-muted text-center text-600"
          v-html="formattedMessage"
        ></p>
        <a-card class="sub-card" :bordered="false">
          <div class="mb-2">
            <otp-input-component
              v-model:value="otp"
              v-model:status="otpStatus"
              @enter="sendOtp"
            />
          </div>
        </a-card>
        <div class="justify-start">
          <template v-if="finished">
            <a-button @click="resendOtp" type="link" class="resend_code">
              {{ $t('sign_with_eimzo_component.resend_code') }}
            </a-button>
          </template>
          <template v-else>
            <div class="mt-2 text-500 text-muted">
              <retry-timer-component
                :second="otpData?.retrySecond || 0"
                @finished="finished = true"
              />
            </div>
          </template>
        </div>
      </div>
    </template>
    <template #footer>
      <div>
        <a-button
          @click="sendOtp"
          :loading="loadingUrl.has('signing')"
          type="primary"
          size="large"
          :disabled="otp?.length !== 6"
          class="login-btn w-full"
        >
          {{ $t('sign_with_eimzo_component.send') }}
        </a-button>
      </div>
    </template>
  </modal-card-component>
</template>

<style scoped lang="scss"></style>
