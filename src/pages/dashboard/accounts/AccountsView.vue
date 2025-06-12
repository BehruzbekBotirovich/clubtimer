<script setup>
import PageHeaderComponent from '@/components/PageHeaderComponent.vue'
import AccountsTableComponent from './components/AccountsTableComponent.vue'
import { nextTick, onMounted, onUpdated, reactive, shallowRef } from 'vue'
import { useQueryParams } from '@/composables/router.js'
import useModal from '@/store/modal.pinia.js'
import { useRoute } from 'vue-router'
import useAccounts from '@/store/accounts.pinia.js'
import { useI18n } from 'vue-i18n'

const { getQueries, setQueries } = useQueryParams()
const accountStore = useAccounts()
const route = useRoute()
const modal = useModal()
const { t } = useI18n()

const filter = reactive({
  status: getQueries().status
})

// function openAccountAddModal() {
//   modal.open({
//     components: shallowRef(AccountAddModalComponent),
//     emits: {
//       close: () => {
//         modal.close(props.modalKey)
//       }
//     },
//     props: {
//       title: t('accounts_page.add')
//     }
//   })
// }


onMounted(() => {
  accountStore.getAllAccount({
    page: getQueries().page,
    size: getQueries().size
  })
})
</script>

<template>
  <div class="flex flex-col h-full">
    <page-header-component>
      <a-button
        v-if="!route.params?.accountId"
        type="primary"
        size="large"
      >
        {{ $t('transactions_page.add') }}
      </a-button>
    </page-header-component>
    <div class="flex-grow overflow-y-auto">
      <accounts-table-component />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>