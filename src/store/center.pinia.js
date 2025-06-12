import {defineStore} from "pinia";
import useCore from "@/store/core.pinia.js";
import {api} from "@/utils/api/index.js";

const useCenterStore = defineStore('center', {
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
            const core = useCore()
            core.loading('get-buildings')
            api({
                url: `/buildings`,
                method: 'GET'
            })
                .then((data) => {
                    this.centers = data.data
                    console.log(this.centers)
                })
                .catch(err => {
                    this.error = 'Ошибка при загрузке данных: ' + err.message;
                    console.error(err);
                })
                .finally(() => {
                    core.loading('get-buildings')
                });
        }
    },

})

export default useCenterStore;