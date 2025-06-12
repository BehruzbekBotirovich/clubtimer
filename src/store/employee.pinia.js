import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import corePinia from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";

const useEmployeesStore = defineStore('employees', {
    state: () => ({
        employees: [{
            id: 1,
            full_name: "Palonchiyev palonchi palonchi",
            location: "Город Ангрен, махалля Дустлик, улица Мустакиллик, дом 23, квартира 7.",
            birthday: 'Apr 12, 1998',
            price: 1500,
            img: new URL('@/assets/removeit/ava1.jpg', import.meta.url).href,
            position: "Admin",
            working_time: "11:00 - 22:00",
            number: '+998 90 000 11 22',
            pochta: 'namesurname@gmail.com'
        }, {
            id: 2,
            full_name: "Ibrohimov Ibrohim Ibrohimovich",
            location: "Город Ангрен, махалля Ташкурган, улица Абая, дом 45",
            birthday: "Feb 5, 1995",
            price: 1800,
            img: new URL('@/assets/removeit/ava2.jpg', import.meta.url).href,
            position: "Manager",
            working_time: "09:00 - 18:00",
            number: "+998 91 123 45 67",
            pochta: 'namesurname@gmail.com'
        }, {
            id: 3,
            full_name: "Karimova Saida Qobilovna",
            location: "Город Ангрен, махалля Истиклол, улица Навоий, дом 1",
            birthday: "Mar 25, 2000",
            price: 1700,
            img: new URL('@/assets/removeit/ava3.png', import.meta.url).href,
            position: "Supervisor",
            working_time: "10:00 - 20:00",
            number: "+998 92 345 67 89",
            pochta: 'namesurname@gmail.com'
        },]
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
                    this.employees = data
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
