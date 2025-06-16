<script setup>
import {reactive, ref} from 'vue'
import {useValidator} from '@/composables/index.js'
import {useI18n} from 'vue-i18n'
import useCore from '@/store/core.pinia.js'
import {PlusOutlined, LoadingOutlined} from '@ant-design/icons-vue'
import useProductStore from "@/store/product.pinia.js";
import {storeToRefs} from "pinia";

const {t} = useI18n()
const {requiredField} = useValidator()

const coreStore = useCore()
const store = useProductStore()
const props = defineProps({
  modalKey: String,
})
const {loadingUrl} = storeToRefs(coreStore)
console.log('modalkey=', props.modalKey)

const formRef = ref()
const form = reactive({
  price: '',
  name: '',
  category: '',
  product_img: null,
})

const roleOptions = [
  {label: t('drink'), value: 'drink'},
  {label: t('other'), value: 'other'}
]

const imageUrl = ref('');
const loading = ref(false);

function submitForm() {
  formRef.value.validate().then(() => {
    const formData = new FormData()
    formData.append('product_img', form.product_img)
    formData.append('name', form.name)
    formData.append('price', form.price)
    formData.append('category', form.category)
    store.createProduct(formData, props.modalKey)
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
  form.product_img = file;
  return false;
}

</script>

<template>
  <a-card class="w-[500px] border-none px-2">
    <h2 class="text-xl font-bold text-center lg:text-left">
      {{ $t('product.product_create') }}
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
          label="Narhi"
          name="price"
          :rules="[{ required: true }]"
      >
        <a-input type="number" v-model:value="form.price"/>
      </a-form-item>
      <a-form-item
          name="category"
          :rules="[{ required: true }]"
      >
        <h3>{{$t('category')}}</h3>
        <a-select v-model:value="form.category" :options="roleOptions"/>
      </a-form-item>
      <a-form-item
          name="product_img"
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
    </a-form>
    <div class="flex justify-end items-center gap-2 mt-4">
      <a-button
          @click="submitForm"
          :loading="loadingUrl.has('create-product')"
          size="large"
          type="primary"
          class="!px-8 w-full"
      >
        {{ t('product.product_create') }}
      </a-button>
    </div>
  </a-card>
</template>

<style scoped lang="scss"></style>
