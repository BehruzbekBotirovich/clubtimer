import {defineStore} from 'pinia'
import useCore from '@/store/core.pinia.js'
import useModal from '@/store/global/modal.pinia.js'
import {api} from '@/utils/api/index.js'

const useAccounts = defineStore('accounts', {
    state: () => ({
        accounts: {
            content: [],
            totalPages: 0,
            totalElements: 0,
            page: 0
        },
        loading: false,
    }),
    actions: {

        getAllAccount({page = 0, size = 15, status}) {
            const core = useCore()
            core.loading('get-all-account')
            api({
                url: '/account',
                params: {page, size, status}
            })
                .then(({data}) => {
                    this.accounts.content = data.content
                    this.accounts.totalPages = data.totalPages
                    this.accounts.totalElements = data.totalElements
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-all-accounts')
                })
        },

        createAccount(form, modalKey) {
            const core = useCore()
            const modal = useModal()
            core.loading('create-account')
            api({
                url: '/account',
                method: 'POST',
                data: form
            })
                .then(({data}) => {
                    core.setToast({
                        locale: 'accounts_page.created_successfully',
                        type: 'success'
                    })
                    modal.close(modalKey)
                    this.getAllAccount({})
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('create-account')
                })
        },

        updateAccount(id, form, callback) {
            this.loading = true
            const core = useCore()
            core.loading('update-account')
            api({
                url: '/account',
                pk: id,
                method: 'PUT',
                data: form
            })
                .then(() => {
                    this.getAllAccount({})
                    core.setToast({
                        locale: 'accounts_page.account_updated_successfully',
                        type: 'success'
                    })
                    callback?.()
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                    core.loading('update-account')
                })
        },

        deleteAccount(id, callback) {
            this.loading = true
            const core = useCore()
            core.loading('delete-account')
            api({
                url: '/account',
                pk: id,
                method: 'DELETE'
            })
                .then(({data}) => {
                    callback?.(data)
                    this.getAllAccount({})
                    core.setToast({
                        locale: 'accounts_page.account_deleted_successfully',
                        type: 'success'
                    })
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                    core.loading('delete-account')
                })
        },

        makePrimaryAccount(id) {
            this.loading = true
            const core = useCore()
            core.loading('account-primary')
            api({
                url: '/account/make-primary',
                pk: id,
                method: 'GET'
            })
                .then(({data}) => {
                    this.getAllAccount({})
                    core.setToast({
                        locale: 'accounts_page.made_primary_done',
                        type: 'success'
                    })
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    this.loading = false
                    core.loading('account-primary')
                })
        }
    }
})

export default useAccounts
