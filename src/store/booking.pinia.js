import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import useCore from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";
import corePinia from "@/store/core.pinia.js";
import useDevicesStore from "@/store/devices.pinia.js";
import dayjs from "dayjs";

const useBookingStore = defineStore('center', {
    state: () => ({
        OneDeviceHistory: null,
        loading: false,
    }),
    actions: {
        getOneDeviceBooking(deviceId) {
            this.OneDeviceHistory = []
            const core = useCore()
            core.loading('get-one-device-timeline')
            api({
                url: `/devices/${deviceId}/timeline`,
                method: 'GET',
            })
                .then(({data}) => {
                    this.OneDeviceHistory = data;
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-one-device-timeline')
                });
        },
        createBooking(data, building_id) {
            const core = useCore()
            core.loading(`device/${data.device_id}`)
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
                    core.loading(`device/${data.device_id}`)
                    this.updateDevicePage(building_id)
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
                    modalPinia.close(modalKey)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('update-booking')
                })
        },

        addTimeToBooking(booking, time, building_id, deviceId) {
            const newEndTime = dayjs(booking.end_time).add(time, 'minute').toISOString()
            const core = useCore()
            core.loading(`device/${deviceId}`)
            api({
                url: `/bookings/${booking._id}`,
                method: 'PUT',
                data: {
                    end_time: newEndTime,
                }
            })
                .then(({data}) => {
                    core.setToast({
                        locale: 'Vaqt qoshildi',
                        type: 'success',
                    })
                    this.updateDevicePage(building_id)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading(`device/${deviceId}`)
                })
        },
        updateDevicePage(building_id) {
            const deviceStore = useDevicesStore()
            const params = {
                building_id
            }
            deviceStore.getAllDevices(params)
        },

        stopThisTime(booking, building_id, deviceId) {
            const newEndTime = new Date().toISOString()
            const core = useCore()
            core.loading(`device/${deviceId}`)
            api({
                url: `/bookings/${booking._id}`,
                method: 'PUT',
                data: {
                    end_time: newEndTime,
                }
            })
                .then(({data}) => {
                    core.setToast({
                        locale: 'Vaqt qoshildi',
                        type: 'success',
                    })
                    this.updateDevicePage(building_id)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading(`device/${deviceId}`)
                })
        }
    },

})

export default useBookingStore;