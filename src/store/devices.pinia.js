import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import corePinia from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";

const useDevicesStore = defineStore('devices', {
    state: () => ({
        devices: [],
    }), actions: {
        getAllDevices(params) {
            this.devices = [];
            const core = corePinia()
            core.loading('get-devices')
            api({
                url: '/devices',
                method: 'GET',
                params
            })
                .then(({data}) => {
                    this.devices = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-devices')
                })
        },

        createDevice(formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('create-device')
            api({
                url: '/devices',
                method: 'POST',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    modalPinia.close(modalKey)
                    const params = {
                        building_id: formData.building_id,
                    }
                    this.getAllDevices(params)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('create-devise')
                })
        },

        deleteDevice(id) {
            const core = corePinia()
            core.loading('delete-devices')
            api({
                url: `/devices/${id}`,
                method: 'DELETE',
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getAllDevices()
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('delete-device')
                })
        },

        updateDevice(id, formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('update-device')
            api({
                url: `/devices/${id}`,
                method: 'PUT',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getAllDevices()
                    modalPinia.close(modalKey)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('update-device')
                })
        }
    },

})

export default useDevicesStore