import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import useCore from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";
import corePinia from "@/store/core.pinia.js";

const useBookingStore = defineStore('center', {
    state: () => ({
        loading: false,
    }),
    actions: {
        getOneDeviceBooking(deviceId) {
            const core = useCore()
            core.loading('get-bookings')
            api({
                url: `/bookings`,
                method: 'GET',
                params:{
                    id: deviceId,
                }
            })
                .then(({data}) => {
                    this.centers = data
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-bookings')
                });
        },
        createBooking(data) {
            const core = useCore()
            core.loading('create-booking')
            api({
                url: '/bookings',
                method: 'POST',
                data,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('create-booking')
                })
        },

        updateBooking(id, formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('update-booking')
            api({
                url: `/bookings/${id}`,
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
                    core.loading('update-booking')
                })
        }
    },

})

export default useBookingStore;