import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import useCore from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";
import corePinia from "@/store/core.pinia.js";

const useCenterStore = defineStore('center', {
    state: () => ({
        loading: false,
        centers: [],
    }),
    actions: {
        getBuildings() {
            const core = useCore()
            core.loading('get-buildings')
            api({
                url: `/buildings`,
                method: 'GET'
            })
                .then(({data}) => {
                    this.centers = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-buildings')
                });
        },
        createCenter(formData, modalKey) {
            const core = useCore()
            const modalPinia = useModal()
            core.loading('create-building')
            api({
                url: '/buildings',
                method: 'POST',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    modalPinia.close(modalKey)
                    this.getBuildings()
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('create-building')
                })
        },

        updateCenter(id, formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('update-building')
            api({
                url: `/buildings/${id}`,
                method: 'PUT',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getBuildings()
                    modalPinia.close(modalKey)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('update-building')
                })
        }
    },

})

export default useCenterStore;