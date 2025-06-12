<script setup>
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import useCore from '@/store/core.pinia.js'
import useAuth from '@/store/auth.pinia.js'
import useModal from '@/store/global/modal.pinia.js'
import { useEimzoApi } from '@/composables/eimzoApi.js'
import { baseUrl } from '@/utils/conf.js'

const { getFrontEndMobileAuth, getStatus } = useEimzoApi(baseUrl)

const hashText = defineModel('hashText')
const emits = defineEmits(['login'])
const props = defineProps({
  size: {
    type: Number,
    default: 250
  },
  modalKey: Number
})
const modal = useModal()
const corePinia = useCore()
const authPinia = useAuth()

const { loadingUrl } = storeToRefs(corePinia)

const isStartTimer = ref(false)
const qrVisible = ref(false)
const qrCode = ref(null)
const timeInterval = ref()
const timer = ref(0)
const timeOutList = ref([])
const document = ref(null)

const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

function callDeeplink(url) {
  window.open(url)
}

function makeAuth() {
  corePinia.loadingUrl.add('/eimzo/frontend/mobile/auth')
  isStartTimer.value = true
  getFrontEndMobileAuth((data, error) => {
    if (data) {
      if (isMobileDevice()) {
        callDeeplink('eimzo://sign?qc=' + data?.qrCode)
      } else if (isStartTimer.value) {
        qrCode.value = data?.qrCode
        document.value = data.documentId
        qrVisible.value = true
        hashText.value = data.hash
        timeOutList.value.push(
          setTimeout(() => {
            checkStatus(data.documentId)
          }, 1000)
        )
      }

      corePinia.loadingUrl.delete('/eimzo/frontend/mobile/auth')
    } else if (error) {
      corePinia.switchStatus(error)
      corePinia.loadingUrl.delete('/eimzo/frontend/mobile/auth')
    }
  })
}

function checkStatus(documentId) {
  getStatus(documentId, (data, error) => {
    if (data) {
      if (data.status === 1) {
        clearTimer()
        authPinia.getMobileQrScannedData(documentId, () => {
          modal.close(props.modalKey)
        })
      } else if (data.status === 2 && isStartTimer.value) {
        timeOutList.value.push(
          setTimeout(() => {
            checkStatus(documentId)
          }, 1000)
        )
        if (timer.value >= 90) {
          clearTimer()
          startTimer()
        }
      } else {
        if (isStartTimer.value) {
          clearTimer()
          startTimer()
        }
      }
    } else if (error) {
      corePinia.switchStatus(error)
      if (isStartTimer.value) {
        clearTimer()
        startTimer()
      }
    }
  })
}

function clearTimer() {
  clearInterval(timeInterval.value)
  timeOutList.value.forEach((item) => {
    clearTimeout(item)
  })
  timer.value = 0
}

function startTimer() {
  clearTimer()
  timeInterval.value = setInterval(() => {
    timer.value++
  }, 1000)
  makeAuth()
}

onMounted(() => {
  isStartTimer.value = true
  startTimer()
})
onBeforeUnmount(() => {
  isStartTimer.value = false
  clearTimer()
})
</script>
<template>
  <a-spin :spinning="loadingUrl.has('/eimzo/frontend/mobile/auth') ||
    loadingUrl.has('/auth/eimzo')
    ">
    <div class="qr-code min-w-[120px] min-h-[120px] mt-2">
      <template v-if="qrVisible">
        <a-qrcode
          :bordered="false"
          class="bg-white"
          :size="size"
          :value="qrCode"
        />
      </template>
    </div>
  </a-spin>
</template>
<style lang="scss" scoped>
//.qr-code {
//  width: 300px;
//  height: 300px;
//}</style>
