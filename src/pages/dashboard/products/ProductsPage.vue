<template>
  <div class="flex items-center justify-between">
    <h1 class="text-2xl font-semibold py-6">
      Tovarlar ({{ productStore.products.length }})
    </h1>
    <div class="flex items-center">
      <a-input-search
          v-model:value="search"
          size="large"
          placeholder="Search"
          enter-button
          @search="onSearch"
          class="w-80 mr-2"
      />
      <a-button @click="openCreateModal" type="primary" size="large" v-if="userPinia.user.role == 'admin'">
        <template #icon>
          <icon-product-add class="text-xl mr-1"/>
        </template>
        {{ $t('product.product_create') }}
      </a-button>
    </div>
  </div>

  <a-spin :spinning="loadingUrl.has('get-products')">
    <ProductCard :data="productStore.products"/>
    <div class="flex justify-end mt-4">
      <a-pagination
          :current="currentPage"
          :pageSize="limit"
          :total="total"
          @change="onPageChange"
          show-size-changer
          @showSizeChange="onPageSizeChange"
          :pageSizeOptions="['10', '20', '50', '100']"
      />
    </div>
  </a-spin>
</template>

<script setup>
import {ref, shallowRef, onMounted} from 'vue'
import useCore from "@/store/core.pinia.js"
import useModal from '@/store/modal.pinia.js'
import {storeToRefs} from "pinia"
import useProductStore from '@/store/product.pinia.js'


import ProductCard from "@/pages/dashboard/products/components/ProductCard.vue";
import IconProductAdd from "@/components/icons/IconProductAdd.vue";
import CreateProductModal from "@/pages/dashboard/products/components/CreateProductModal.vue";
import useUser from "@/store/user.pinia.js";

const userPinia = useUser();
const productStore = useProductStore()
const search = ref('')
const currentPage = ref(1)
const limit = ref(20)
const total = ref(0)

const modal = useModal()
const corePinia = useCore()
const {loadingUrl} = storeToRefs(corePinia)

function fetchProduct() {
  const params = {
    search: search.value || undefined,
    page: currentPage.value,
    limit: limit.value
  }

  productStore.getAllProducts(params)
}

onMounted(() => {
  if (productStore.products.length === 0) {
    fetchProduct()
  }
})

function openCreateModal() {
  modal.open({
    component: shallowRef(CreateProductModal)
  })
}

function onSearch() {
  currentPage.value = 1
  fetchProduct()
}

function onPageChange(page) {
  currentPage.value = page
  fetchProduct()
}

function onPageSizeChange(current, size) {
  limit.value = size
  currentPage.value = 1
  fetchProduct()
}
</script>
