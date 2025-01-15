<template>
  <div class="flex flex-col h-full">
    <div class="flex  justify-center p-2">
      <div class="flex items-center gap-2"><img src="../assets/logo.svg" alt="" height="50" width="50">
        <span class="font-bold text-2xl"> Logo name</span>
      </div>
    </div>

    <a-menu mode="inline" default-selected-keys="['1']">

      <router-link to="/cabinet/dashboard">
        <a-menu-item key="1" :class="{ 'ant-menu-item-selected': $route.path === '/cabinet/dashboard' }">
          <div class="flex items-center gap-2">
            <dashboard-icon/>
            Dashboard
          </div>
        </a-menu-item>
      </router-link>

      <router-link to="/cabinet/centers">
        <a-menu-item key="2"
                     :class="{ 'ant-menu-item-selected': $route.path.includes('/cabinet/centers') }">
          <div class="flex items-center gap-2">
            <centers-icon/>
            <span>Centers</span>
          </div>

        </a-menu-item>
      </router-link>

      <router-link to="/cabinet/employees">
        <a-menu-item key="3" :class="{ 'ant-menu-item-selected': $route.path === '/cabinet/employees' }">
          <div class="flex items-center gap-2">
            <employee-icon/>
            <span>Employees</span>
          </div>
        </a-menu-item>
      </router-link>

      <RouterLink to="/cabinet/income">
        <a-menu-item key="4" :class="{ 'ant-menu-item-selected': $route.path === '/cabinet/income' }">
          <div class="flex items-center gap-2">
            <income-icon/>
            <span>Income</span>
          </div>
        </a-menu-item>
      </RouterLink>

      <RouterLink to="/cabinet/setting">
        <a-menu-item key="5" :class="{ 'ant-menu-item-selected': $route.path === '/cabinet/setting' }">
          <div class="flex items-center gap-2">
            <setting-icon/>
            <span>Settings</span>
          </div>
        </a-menu-item>
      </RouterLink>

    </a-menu>

    <!-- profile -->
    <div class="flex items-center w-full  px-6 py-2  mt-auto mb-10">
      <div class="w-10 h-10 rounded-full overflow-hidden mr-2 bg-blue-200">
        <img class="object-cover" src="@/assets/images/avatar.png" alt="">
      </div>
      <div>
        <h3 class="font-normal text-base">Hasan Berdiyev</h3>
        <p class="text-gray-500">Admin</p>
      </div>
      <div class="ml-auto ">
        <router-link to="/login">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M21 2C21.5128 2 21.9355 2.38604 21.9933 2.88338L22 3V21C22 21.5128 21.614 21.9355 21.1166 21.9933L21 22H15C14.4477 22 14 21.5523 14 21C14 20.4872 14.386 20.0645 14.8834 20.0067L15 20H20V4H15C14.4872 4 14.0645 3.61396 14.0067 3.11662L14 3C14 2.48716 14.386 2.06449 14.8834 2.00673L15 2H21ZM10.6129 6.2097L10.7071 6.29289L15.7071 11.2929C16.0676 11.6534 16.0953 12.2206 15.7903 12.6129L15.7071 12.7071L10.7071 17.7071C10.3166 18.0976 9.68342 18.0976 9.29289 17.7071C8.93241 17.3466 8.90468 16.7794 9.2097 16.3871L9.29289 16.2929L12.585 13H3C2.44772 13 2 12.5523 2 12C2 11.4872 2.38604 11.0645 2.88338 11.0067L3 11H12.585L9.29289 7.70711C8.93241 7.34662 8.90468 6.77939 9.2097 6.3871L9.29289 6.29289C9.62334 5.96245 10.1275 5.91161 10.5114 6.14038L10.6129 6.2097Z"
                  fill="#7D8592"/>
          </svg>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from 'vue';
import EmployeeIcon from './icons/EmployeeIcon.vue';
import DashboardIcon from './icons/DashboardIcon.vue';
import CentersIcon from './icons/CentersIcon.vue';
import IncomeIcon from './icons/IncomeIcon.vue';
import SettingIcon from './icons/SettingIcon.vue';
</script>

<style lang="scss" scoped>
.site-layout-background {
  background: #fff;
}

:deep(.ant-menu-item-selected) {
  background: #5932EA;
  color: white;
  display: flex;
  align-items: center;
  transition: all 0.2s linear;

  svg > path {
    stroke: white;
  }
}
</style>