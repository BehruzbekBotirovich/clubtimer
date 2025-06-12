import {defineStore} from 'pinia'
import useCore from '@/store/core.pinia.js'
import {api} from '@/utils/api/index.js'

import useModal from '@/store/modal.pinia.js'
import {shallowRef} from 'vue'
import OtpModalComponent from '@/components/OtpModalComponent.vue'

const useAuth = defineStore('auth', {
    state: () => ({
        otpData: null,
        loading: false
    }),
    actions: {
        loginWithPassword(form) {
            const core = useCore()
            core.loading('get-token')
            api({
                url: `/auth/login`,
                method: 'POST',
                data: form
            })
                .then(({data}) => {
                    localStorage.setItem('access_token', data?.accessToken)
                    localStorage.setItem('refresh_token', data?.refreshToken)
                    core.redirect('/dashboard')
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-token')
                })
        }
    }

})

export default useAuth
