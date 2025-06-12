<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  second: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['finished', 'update'])

const minute = ref(0)
const currentSecond = ref(0)
const retrySeconds = ref(0)
const timeInterval = ref()

const retryTimeOtp = () => {
  if (timeInterval.value) {
    clearInterval(timeInterval.value)
  }
  retrySeconds.value = props.second

  minute.value = Math.floor(retrySeconds.value / 60)
  currentSecond.value = retrySeconds.value % 60

  timeInterval.value = setInterval(() => {
    retrySeconds.value--

    if (retrySeconds.value <= 0) {
      clearInterval(timeInterval.value)
      emits('finished')
      return
    }

    minute.value = Math.floor(retrySeconds.value / 60)
    currentSecond.value = retrySeconds.value % 60

    emits(
      'update',
      `${minute.value > 0 && minute.value < 10 ? `0${minute.value}` : minute.value}:${
        currentSecond.value < 10
          ? `0${currentSecond.value}`
          : currentSecond.value
      }`,
      retrySeconds.value
    )
  }, 1000)
}

onMounted(() => {
  retryTimeOtp()
})
onBeforeUnmount(() => {
  clearInterval(timeInterval.value)
})
</script>

<template>
  <span class="timer">
    {{ minute > 0 && minute < 10 ? `0${minute}` : minute }}:{{
      currentSecond < 10 ? `0${currentSecond}` : currentSecond
    }}
  </span>
</template>

<style scoped lang="scss">
.timer {
  padding: 0 7px;
}
</style>
