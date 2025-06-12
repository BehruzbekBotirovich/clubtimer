import { defineStore } from 'pinia'
import { api } from '@/utils/api/index.js'
import useCore from '@/store/core.pinia.js'

const useUser = defineStore('User', {
  state: () => ({
    user: null,
    branches: {
      content: [],
      total: 15
    }
  }),
  actions: {
    getUserMe() {
      const core = useCore()
      core.loadingMain = true
      api({
        url: '/users/me'
      })
        .then(({ data }) => {
          this.user = data
        })
        .catch((error) => {
          core.switchStatus(error)
        })
        .finally(() => {
          core.loadingMain = false
        })
    },

    unLinkFromTelegram() {
      const core = useCore()
      api({
        url: 'user/unlink-bot',
        pk: this.user.hashId,
        method: 'PUT'
      })
        .then(({}) => {
          core.setToast({
            locale: 'notification_component.success',
            type: 'success'
          })
        })
        .catch((error) => {
          core.switchStatus(error)
        })
    }
  }
})

export default useUser
