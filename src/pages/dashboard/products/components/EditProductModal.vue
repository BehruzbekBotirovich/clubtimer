<script setup>
import useCore from "@/store/core.pinia.js";
import useProductStore from '@/store/product.pinia.js'
import {ref, reactive} from "vue";
import {storeToRefs} from "pinia";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";

const core = useCore();
const store = useProductStore()
const {loadingUrl} = storeToRefs(core);
const props = defineProps({
  user: Object,
  modalKey: String,
})

const form = reactive({
  name: props.user.name,
  price: props.user.price,
  category: props.user.category,
  product_img: null,
})

function submitForm() {
  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('price', form.price)
  formData.append('category', form.category)
  if (form.product_img !== null) {
    formData.append('product_img', form.product_img)
  }
  store.updateProduct(props.user._id, formData, props.modalKey)
}


const imageUrl = ref('');
const loading = ref(false);

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

  <a-form :model="form" class="w-[500px] p-4">
    <h3 class="font-bold text-xl">{{ $t('product.product_update') }}</h3>
    <a-form-item label="Name" name="name" :rules="[{ required: true }]">
      <a-input v-model:value="form.name" size="large"/>
    </a-form-item>

    <a-form-item label="Narxi" name="price" :rules="[{ required: true }]">
      <a-input v-model:value="form.price" size="large" type="number"/>
    </a-form-item>

    <a-form-item name="category" :rules="[{ required: true }]">
      <h3>{{ $t('category') }}</h3>
      <a-select v-model:value="form.category" :options="[
        { label: $t('drink'), value: 'drink' },
        { label: $t('other'), value: 'other' }
      ]"/>
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
    <a-button
        @click="submitForm"
        :loading="loadingUrl.has('update-product')"
        size="large"
        type="primary"
        class="!px-8 w-full">
      {{ $t('product.product_update') }}
    </a-button>
  </a-form>
</template>

<style scoped lang="scss">
</style>
