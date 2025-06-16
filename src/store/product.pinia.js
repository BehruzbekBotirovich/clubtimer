import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import corePinia from "@/store/core.pinia.js";
import useModal from "@/store/modal.pinia.js";

const useProductStore = defineStore('products', {
    state: () => ({
        products: [],
    }), actions: {
        getAllProducts(params) {
            const core = corePinia()
            core.loading('get-products')
            api({
                url: '/products',
                method: 'GET',
                params: params
            })
                .then(({data}) => {
                    this.products = data.content
                })
                .catch((error) => {
                    core.switchStatus(error)
                })
                .finally(() => {
                    core.loading('get-products')
                })
        },

        createProduct(formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('create-product')
            api({
                url: '/products',
                method: 'POST',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    modalPinia.close(modalKey)
                    this.getAllProducts()
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('create-product')
                })
        },

        deleteProduct(id) {
            const core = corePinia()
            core.loading('delete-product')
            api({
                url: `/products/${id}`,
                method: 'DELETE',
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getAllProducts()
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('delete-product')
                })
        },

        updateProduct(id, formData, modalKey) {
            const core = corePinia()
            const modalPinia = useModal()
            core.loading('update-product')
            api({
                url: `/products/${id}`,
                method: 'PUT',
                data: formData,
            })
                .then(({data}) => {
                    core.setToast({
                        locale: data.message,
                        type: 'success',
                    })
                    this.getAllProducts()
                    modalPinia.close(modalKey)
                })
                .catch((error) => {
                    core.setToast(error)
                })
                .finally(() => {
                    core.loading('update-product')
                })
        }
    },

})

export default useProductStore