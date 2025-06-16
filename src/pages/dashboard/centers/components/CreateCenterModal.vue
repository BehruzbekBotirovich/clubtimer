<script setup>
import useCenterStore from "@/store/center.pinia.js";
import useCore from '@/store/core.pinia.js'
import {reactive, ref} from 'vue'
import {useValidator} from '@/composables/index.js'
import {useI18n} from 'vue-i18n'
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons-vue'
import {storeToRefs} from "pinia";
import MapPicker from "@/components/MapPicker.vue";

const {t} = useI18n()
const {requiredField} = useValidator()
const coreStore = useCore()
const store = useCenterStore()
const props = defineProps({
  modalKey: String,
})
const {loadingUrl} = storeToRefs(coreStore)
console.log('modalkey=', props.modalKey)

const formRef = ref()
const form = reactive({
  openCloseTime: '',
  name: '',
  location: '',
  coordinates: null,
  image: null,
})

const imageUrl = ref('');
const loading = ref(false);

function submitForm() {
  formRef.value.validate().then(() => {
    const formData = new FormData()
    formData.append('image', form.image)
    formData.append('name', form.name)
    formData.append('location', form.location)
    formData.append('openCloseTime', form.openCloseTime[0] + ' - ' + form.openCloseTime[1])
    formData.append('coordinates', JSON.stringify(form.coordinates))
    store.createCenter(formData, props.modalKey)
  }).catch((error) => {
    console.log('Form validation failed:', error)
  })
}

function beforeUpload(file) {
  const reader = new FileReader();
  reader.onload = () => {
    imageUrl.value = reader.result;
  };
  reader.readAsDataURL(file);
  form.image = file;
  return false;
}

</script>

<template>
  <a-card class="w-[500px] border-none px-2">
    <h2 class="text-xl font-bold text-center lg:text-left">
      {{ $t('center.center_create') }}
    </h2>
    <a-form ref="formRef" :model="form">
      <a-form-item
          label="Nomi"
          name="name"
          :rules="[{ required: true }]"
      >
        <a-input v-model:value="form.name"/>
      </a-form-item>
      <a-form-item
          label="Manzil"
          name="location"
          :rules="[{ required: true }]"
      >
        <a-input v-model:value="form.location"/>
      </a-form-item>
      <a-form-item
          name="openCloseTime"
          :rules="[{ required: true, message: 'Iltimos, ish vaqtini kiriting' }]"
      >
        <h3>Ish vaqti</h3>
        <a-time-range-picker
            v-model:value="form.openCloseTime"
            format="HH:mm"
            value-format="HH:mm"
            class="w-full"
        />
      </a-form-item>
      <a-form-item
          name="image"
          :rules="[{ required: true }]"
      >
        <h3>Rasmini yuklash</h3>
        <a-upload
            name="product_img"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            accept="image/*"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 100%"/>
          <div v-else>
            <loading-outlined v-if="loading"/>
            <plus-outlined v-else/>
            <div style="margin-top: 8px">Upload</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item
          label="Koordinata"
          name="coordinates"
          :rules="[{ required: true, message: 'Manzilni belgilang' }]"
      >
        <MapPicker v-model="form.coordinates"/>
      </a-form-item>

    </a-form>
    <div class="flex justi
    fy-end items-center gap-2 mt-4">
      <a-button
          @click="submitForm"
          :loading="loadingUrl.has('create-building')"
          size="large"
          type="primary"
          class="!px-8 w-full"
      >
        {{ t('center.center_create') }}
      </a-button>
    </div>
  </a-card>
</template>

<style scoped lang="scss"></style>
