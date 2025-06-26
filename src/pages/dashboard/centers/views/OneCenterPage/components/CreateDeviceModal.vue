<script setup>
import {onMounted, reactive, ref, computed} from 'vue'
import {useValidator} from '@/composables/index.js'
import {useI18n} from 'vue-i18n'
import useCore from '@/store/core.pinia.js'
import {storeToRefs} from "pinia";
import useTariffStore from "@/store/tariff.pinia.js";
import useDevicesStore from "@/store/devices.pinia.js";

const {t} = useI18n()
const {requiredField} = useValidator()
const deviceStore = useDevicesStore()
const coreStore = useCore()
const tariffPinia = useTariffStore()
const props = defineProps({
  modalKey: String,
  building_id: String,
})
const {loadingUrl} = storeToRefs(coreStore)

const formRef = ref()
const form = reactive({
  name: '',
  type: '',
  tariff_id: ''
})

const typeOptions = [
  {label: t('Playstation'), value: 'PS'},
  {label: t('Billiard'), value: 'table'},
  {label: t('Karaoke'), value: 'karaoke'},
  {label: t('Boshqa'), value: 'other'},
]


function submitForm() {
  formRef.value.validate().then(() => {
    const formData = new FormData()
    formData.append('building_id', props.building_id)
    formData.append('name', form.name)
    formData.append('type', form.type)
    formData.append('tariff_id', form.tariff_id)
    deviceStore.createDevice(formData, props.modalKey)
  }).catch((error) => {
    console.log('Form validation failed:', error)
  })
}

const tariffOptions = computed(() => {
  return tariffPinia.tariffs.map(tariff => ({
    label: tariff.tariff_name,
    value: tariff._id
  }))
})

onMounted(() => {
  if (tariffPinia.tariffs.length === 0) {
    tariffPinia.getAllTariffs();
  }
});

</script>

<template>
  <a-card class="w-[500px] border-none px-2">
    <h2 class="text-xl font-bold text-center lg:text-left">
      {{ $t('device.add') }}
    </h2>
    <a-form ref="formRef" :model="form">
      <a-form-item
          label="Nomi"
          name="name"
          :rules="[requiredField]"
      >
        <a-input v-model:value="form.name"/>
      </a-form-item>
      <a-form-item
          name="type"
          :rules="[requiredField]"
      >
        <h3>{{ $t('type') }}</h3>
        <a-select v-model:value="form.type" :options="typeOptions"/>
      </a-form-item>
      <a-form-item name="tariff_id" :rules="[requiredField]">
        <h3>Tariff tanlang</h3>
        <a-select
            v-model:value="form.tariff_id"
            :options="tariffOptions"
            placeholder="Tariffni tanlang"
        />
      </a-form-item>
    </a-form>
    <div class="flex justify-end items-center gap-2 mt-4">
      <a-button
          @click="submitForm"
          :loading="loadingUrl.has('create-product')"
          size="large"
          type="primary"
          class="!px-8 w-full"
      >
        {{ t('device.add') }}
      </a-button>
    </div>
  </a-card>
</template>

<style scoped lang="scss"></style>
