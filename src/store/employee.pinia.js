import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import corePinia from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";

const useEmployeesStore = defineStore('employees', {
    state: () => ({
        employees: []
    }), actions: {
        getAllEmployees(params) {
            const core = corePinia()
            core.loading('get-employees')
            api({
                url: '/users',
                method: 'GET',
                params: params
            })
                .then(({data}) => {
                    this.employees = data.content
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-employees')
                })
        },

        createEmployee(formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('create-employee')
            api({
                url: '/users',
                method: 'POST',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    modalPinia.close(modalKey)
                    this.getAllEmployees()
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('create-employee')
                })
        },

        reactiveUser(id) {
            const core = corePinia()
            core.loading('reactive-user')
            api({
                url: `/users/${id}`,
                method: 'DELETE',
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getAllEmployees()
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('reactive-user')
                })
        },
        updateEmployee(id, formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('update-employee')
            api({
                url: `/users/${id}`,
                method: 'PUT',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getAllEmployees()
                    modalPinia.close(modalKey)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('update-employee')
                })
        }
    },

})

export default useEmployeesStore
