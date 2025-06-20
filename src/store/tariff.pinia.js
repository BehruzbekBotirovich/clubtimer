import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import corePinia from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";

const useTariffStore = defineStore('tariff', {
    state: () => ({
        tariffs: [],
    }), actions: {
        getAllTariffs() {
            const core = corePinia()
            core.loading('get-tariff')
            api({
                url: '/tariffs',
                method: 'GET',
                            })
                .then(({data}) => {
                    this.tariffs = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-tariff')
                })
        },

        createTariff(formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('create-tariff')
            api({
                url: '/tariffs',
                method: 'POST',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    modalPinia.close(modalKey)
                    this.getAllTariffs()
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('create-devise')
                })
        },

        deleteTariff(id) {
            const core = corePinia()
            core.loading('delete-tariff')
            api({
                url: `/tariffs/${id}`,
                method: 'DELETE',
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getAllTariffs()
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('delete-tariff')
                })
        },

        updateTariff(id, formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('update-tariff')
            api({
                url: `/tariffs/${id}`,
                method: 'PUT',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getAllTariffs()
                    modalPinia.close(modalKey)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('update-tariff')
                })
        }
    },

})

export default useTariffStore