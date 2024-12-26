<template>
  <div class="flex  justify-center p-2">
    <div class="flex items-center gap-2"><img src="../assets/logo.jpg" alt="" height="50" width="50">
      <span class="font-bold text-2xl"> Logo name</span>
    </div>
  </div>

  <nav>
    <ul class="navbar">
      <li :class="{ 'active-page': $route.path === '/dashboard/lessons' }">
        <span>Dashboard</span>
      </li>
    </ul>
  </nav>

  <a-menu mode="inline" default-selected-keys="['1']">

    <router-link to="lessons">
      <a-menu-item key="1" :class="{ 'ant-menu-item-selected': $route.path === '/dashboard/lessons' }">

        <div class="flex items-center gap-2">
          <img src="@/components/icons/dashboard.svg" alt=""> Dashboard
        </div>
      </a-menu-item>
    </router-link>

    <router-link to="tasks">
      <a-menu-item key="2" :class="{ 'ant-menu-item-selected': $route.path === '/dashboard/tasks' }">
        <CheckSquareOutlined/>
        <span>Centers</span>
      </a-menu-item>
    </router-link>

    <router-link to="clients">
      <a-menu-item key="3" :class="{ 'ant-menu-item-selected': $route.path === '/dashboard/clients' }">
        <UserOutlined/>
        <span>Employees</span>
      </a-menu-item>
    </router-link>

    <RouterLink to="teachers">
      <a-menu-item key="4" :class="{ 'ant-menu-item-selected': $route.path === '/dashboard/teachers' }">
        <UsergroupAddOutlined/>
        <span>Income</span>
      </a-menu-item>
    </RouterLink>
    <router-link to="/income">
      income
    </router-link>
    <RouterLink to="teachers">
      <a-menu-item key="5" :class="{ 'ant-menu-item-selected': $route.path === '/dashboard/teachers' }">
        <UsergroupAddOutlined/>
        <span>Income</span>
      </a-menu-item>
    </RouterLink>

    <RouterLink to="teachers">
      <a-menu-item key="6" :class="{ 'ant-menu-item-selected': $route.path === '/dashboard/teachers' }">
        <UsergroupAddOutlined/>
        <span>Settings</span>
      </a-menu-item>
    </RouterLink>

  </a-menu>
</template>

<script setup>
import {ref} from 'vue';
import {
  ProfileOutlined,
  CheckSquareOutlined,
  UserOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  PhoneOutlined,
  LockOutlined
} from '@ant-design/icons-vue';

</script>

<style scoped>
.site-layout-background {
  background: #fff;
}

:deep(.ant-menu-item-selected) {
  background: #5932EA;
  color: white;
  display: flex;
  align-items: center;
}


.active-page {
  background: #5932EA;
  color: white;
  display: flex;
  align-items: center;
}
</style>