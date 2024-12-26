<script setup>
import {RouterLink, RouterView} from 'vue-router'
import AsideComponent from '@/components/Aside.vue';

const contentStyle = {
  backgroundColor: '#',
};
const siderStyle = {
  backgroundColor: '#ffffff',
};

</script>

<template>
  <a-layout style="height: 100vh;">
    <a-layout-sider :style="siderStyle" width="260">
      <aside-component/>
    </a-layout-sider>
    <a-layout>

      <a-layout-content :style="contentStyle" class="overflow-auto p-4">
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>


</template>

<style scoped>
:deep(.ant-layout .ant-layout-header) {
  height: 72px;
  line-height: 72px;
}

.aside-block {
  width: 250px !important;

  @media (max-width: 1024px) {
    width: 250px;
  }

}
</style>
