import { defineStore } from "pinia";
import axios from '@/utils/axios.js';

export const useCenterStore = defineStore('center', {
    state: () => ({
        loading: false,
        centers: [],

        center_stuffs: [
            {
                type: 'PS4',
                price: 10,
                startTime: '19:00',
                endTime: '19:20',
                timer: true,
            }
        ]
    }),
    actions: {
        getBuildings() {
            this.loading = true;
            this.error = null;
            axios.get('/buildings')
                .then((data) => {
                    this.centers = data.data
                    console.log(this.centers)
                })
                .catch(err => {
                    this.error = 'Ошибка при загрузке данных: ' + err.message;
                    console.error(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    },

})
