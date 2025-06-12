<script setup>
import { shallowRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useAmountFormatter } from '@/composables/amount.js'
import { useQueryParams } from '@/composables/router.js'
import IconThreeDots from "@/components/icons/IconThreeDots.vue"
// stores
import useAccounts from '@/store/accounts.pinia.js'
import useCore from '@/store/core.pinia.js'
import useModal from '@/store/modal.pinia.js'
// components
import PaginationComponent from '@/components/PaginationComponent.vue'
import PageLoaderComponent from '@/components/PageLoaderComponent.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconSaved from '@/components/icons/IconSaved.vue'
import IconStar from '@/components/icons/IconStar.vue'

const { formatAccountAmount } = useAmountFormatter()
const { getQueries } = useQueryParams()

// stores
const modal = useModal()
const coreStore = useCore()
const accountsStore = useAccounts()
const { accounts } = storeToRefs(accountsStore)

const accountTableColumns = [
    {
        title: 'MFO',
        key: 'mfo',
        dataIndex: 'mfo',
    },
    {
        title: 'Account',
        key: 'account',
        dataIndex: 'account'
    },
    {
        title: '',
        key: 'isPrimary',
        width: 34,
    },
    {
        title: '',
        key: 'action',
        width: 70,
    }
]

const deleteAccount = (id) => {
    accountsStore.deleteAccount(id)
}

const makePrimary = (id) => {
    accountsStore.makePrimaryAccount(id)
}
</script>

<template>
    <page-loader-component :loading="coreStore.isLoading('get-transactions')">
        <a-table row-key="id" :columns="accountTableColumns" :data-source="accounts.content"
            :loading="accountsStore.loading" :pagination="false" :scroll="{ y: 'calc(100vh - 270px)' }" class="mb-4">
            <template #headerCell="{ column }">
                {{ column.title && $t(column.title) }}
            </template>

            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'mfo'">
                    <span class="m-0 text-base font-medium text-black">
                        {{ record?.mfo }}
                    </span>
                </template>

                <template v-if="column.key === 'account'">
                    <span class="m-0 text-base font-medium text-black line-clamp-1">
                        {{ formatAccountAmount(record?.account) }}
                    </span>
                </template>
                <template v-if="column.key === 'isPrimary'">
                    <a-popover>
                        <template #content>
                            {{ $t('accounts_page.primary') }}
                        </template>
                        <icon-star v-if="record?.isPrimary" />
                    </a-popover>
                </template>
                <template v-if="column.key === 'action'">
                    <a-dropdown :trigger="['click']">
                        <a-button class="border-none" type="text">
                            <template #icon>
                                <icon-three-dots />
                            </template>
                        </a-button>
                        <template #overlay>
                            <a-menu class="w-fit">
                                <a-menu-item key="0" v-if="record?.isPrimary === false">
                                    <a-popconfirm :title="$t('accounts_page.account_delete_confirm')"
                                        class="flex items-center gap-2" :ok-text="$t('header_component.yes')"
                                        :cancel-text="$t('header_component.no')" @confirm="deleteAccount(record.id)"
                                        placement="left">
                                        <icon-delete />
                                        <span>{{ $t('transactions_page.delete') }}</span>
                                    </a-popconfirm>
                                </a-menu-item>
                                <a-menu-item key="1" class="flex items-center gap-2">
                                    <div @click="updateAccount(record)" class="flex items-center gap-2">
                                        <icon-edit />
                                        <span> {{ $t('transactions_page.edit') }}</span>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="2" class="flex items-center gap-2">
                                    <div @click="makePrimary(record.id)" class="flex items-center gap-2">
                                        <icon-saved />
                                        <span> {{ $t('accounts_page.made_primary') }}</span>
                                    </div>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </template>
            </template>
        </a-table>
        <pagination-component :total="accounts.totalElements" />
    </page-loader-component>
</template>

<style scoped lang="scss"></style>