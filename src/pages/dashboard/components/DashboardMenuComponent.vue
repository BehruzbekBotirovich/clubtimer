<script setup>
import {computed, h, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRoute, useRouter} from 'vue-router'
import IconChevronLeftDouble from '@/components/icons/IconChevronLeftDouble.vue'
import IconChevronRightDouble from '@/components/icons/IconChevronRightDouble.vue'
import navigations from '@/routers/navigations.js'
import useCore from '@/store/core.pinia.js'
import {storeToRefs} from 'pinia'

const {t} = useI18n()

const route = useRoute()
const router = useRouter()

const coreStore = useCore()

const {collapsed} = storeToRefs(coreStore)

const menuList = navigations
    .filter((item) => item.meta?.showMenu)
    .map((item) => {
      const children = item.children?.filter((child) => child.meta?.showMenu).map((child) => ({
        label: t(`menu.${child.name}`),
        key: `/dashboard/${item.path}/${child.path}`, // 👈 полный путь
        name: child.name,
        icon: child.meta?.icon,
      }))

      return {
        label: t(`menu.${item.name}`),
        key: `/dashboard/${item.path}`,
        name: item.name,
        icon: item.meta.icon,
        children: children?.length ? children : undefined,
      }
    })


const selectedKeys = computed(() => [route.path])

const openKeys = computed(() => {
  // Получаем родительский путь, например: "/dashboard/settings"
  const segments = route.path.split('/')
  if (segments.length > 3) {
    return [`/${segments[1]}/${segments[2]}`]
  }
  return []
})


function navigate({key}) {
  router.push(key)
}
</script>

<template>
  <div class="h-full p-2 bg-white rounded-[16px]">
    <div
        class="flex items-center"
        :class="[collapsed ? 'justify-center' : 'justify-between']"
    >
      <div v-if="!collapsed">
        <h1 class="font-medium text-sm m-0 px-2 uppercase text-muted">Menu</h1>
      </div>
      <div>
        <a-button @click="coreStore.changeCollapsed()" type="text">
          <template #icon>
            <IconChevronRightDouble v-if="collapsed" class="text-2xl"/>
            <IconChevronLeftDouble v-else class="text-2xl"/>
          </template>
        </a-button>
      </div>
    </div>
    <div class="flex flex-col gap-[2px] w-full menu">
      <a-menu
          @click="navigate"
          :selected-keys="selectedKeys"
          :open-keys="openKeys"
          :items="menuList"
          :inline-collapsed="collapsed"
          mode="inline"
          class="ant-menu-custom-class"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variable';

.menu {
  &:deep(.ant-menu-item) {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;

    .ant-menu-title-content {
      line-height: 18px;
    }

    .ant-menu-item-icon {
      font-size: 20px !important;
    }
  }

  &:deep(.ant-menu-item-selected) {
    background: $primary;
    color: #fff;
  }
}

:deep(.ant-menu-submenu-title) {
  padding-left: 16px !important;

  svg {
    font-size: 18px !important;
  }
}

.menu {
  &:deep( .ant-menu-sub .ant-menu-item) {
    padding-left: 30px !important;
    border-radius: 10px;
    margin: 2px 8px;
  }
}

.menu {
  // Обычный размер
  &:deep(.ant-menu-item-icon),
  &:deep(.ant-menu-submenu-title .ant-menu-item-icon) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    min-width: 24px;
    height: 24px;
    font-size: 20px !important;
    margin-inline-end: 8px; // отступ между иконкой и текстом
  }

  // При collapsed — центрируем полностью
  &:deep(.ant-menu-inline-collapsed .ant-menu-item-icon),
  &:deep(.ant-menu-inline-collapsed .ant-menu-submenu-title .ant-menu-item-icon) {
    display: flex !important;
    justify-content: center;
    margin: 0 auto !important;
  }
}


.settings-menu {
  .setting-border {
    border-top: 1px solid rgb($muted, 1);
  }
}
</style>
