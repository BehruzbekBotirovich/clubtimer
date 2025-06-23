<script setup>
import {computed, h} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRoute, useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import navigations from '@/routers/navigations.js'
import useCore from '@/store/core.pinia.js'
import useUser from '@/store/user.pinia.js'
import IconChevronLeftDouble from '@/components/icons/IconChevronLeftDouble.vue'
import IconChevronRightDouble from '@/components/icons/IconChevronRightDouble.vue'

const {t} = useI18n()
const route = useRoute()
const router = useRouter()

const coreStore = useCore()
const {collapsed} = storeToRefs(coreStore)

const userStore = useUser()
const {user} = storeToRefs(userStore)

function buildFullPath(parent, child = '') {
  return `/dashboard/${parent}${child ? '/' + child : ''}`
}

const menuList = computed(() => {
  return navigations
      .filter(item => {
        const roles = item.meta?.roles || []
        return item.meta?.showMenu && (!roles.length || roles.includes(user.value.role))
      })
      .map(item => {
        const children = item.children?.filter(child => {
          const roles = child.meta?.roles || []
          return child.meta?.showMenu && (!roles.length || roles.includes(user.value.role))
        }).map(child => ({
          label: t(`menu.${child.name}`),
          key: buildFullPath(item.path, child.path),
          name: child.name,
          icon: child.meta.icon
        }))

        return {
          label: t(`menu.${item.name}`),
          key: buildFullPath(item.path),
          name: item.name,
          icon: item.meta.icon,
          children: children?.length ? children : undefined
        }
      })
})

const selectedKeys = computed(() => [route.path])

const openKeys = computed(() => {
  const parts = route.path.split('/')
  return parts.length >= 3 ? [`/dashboard/${parts[2]}`] : []
})

function navigate({item}) {
  const allRoutes = navigations.flatMap(r => [r, ...(r.children || [])])
  const found = allRoutes.find(r => r.name === item.name)
  if (found) {
    router.push({name: found.name})
  }
}
</script>

<template>
  <div class="h-full p-2 bg-white rounded-[16px]">
    <div class="flex items-center" :class="[collapsed ? 'justify-center' : 'justify-between']">
      <div v-if="!collapsed">
        <h1 class="font-medium text-sm m-0 px-2 uppercase text-muted">Menu</h1>
      </div>
      <a-button @click="coreStore.changeCollapsed()" type="text">
        <template #icon>
          <IconChevronRightDouble v-if="collapsed" class="text-2xl"/>
          <IconChevronLeftDouble v-else class="text-2xl"/>
        </template>
      </a-button>
    </div>

    <a-menu
        class="ant-menu-custom-class menu"
        mode="inline"
        :inline-collapsed="collapsed"
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        :items="menuList"
        @click="navigate"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

.menu {
  // Иконки одинаково большие везде
  &:deep(.ant-menu-item-icon) {
    width: 28px;
    height: 28px;
    font-size: 22px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  // Обычные пункты меню
  &:deep(.ant-menu-item),
  &:deep(.ant-menu-submenu-title) {
    font-size: 16px;
    font-weight: 500;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    transition: background 0.3s;
  }

  &:deep(.ant-menu-submenu .ant-menu-submenu-title) {
    padding-left: 14px !important;
  }

  // Пункты в submenu — чуть больше отступа слева
  &:deep(.ant-menu-sub .ant-menu-item) {
    padding-left: 44px !important;
    border-radius: 6px;
    margin: 2px 8px;
    font-size: 15px;
  }

  // Активные пункты
  &:deep(.ant-menu-item-selected),
  &:deep(.ant-menu-sub .ant-menu-item-selected),
  &:deep(.ant-menu-submenu-selected > .ant-menu-submenu-title) {
    background-color: $primary;
    color: #fff !important;

    .ant-menu-item-icon {
      color: #fff !important;
    }
  }

  // Collapse поведение — центрируем иконки
  &:deep(.ant-menu-inline-collapsed .ant-menu-item-icon),
  &:deep(.ant-menu-inline-collapsed .ant-menu-submenu-title .ant-menu-item-icon) {
    margin: 0 auto;
  }
}
</style>
.ant-menu-submenu .ant-menu-submenu-title