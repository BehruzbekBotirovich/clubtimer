import {defineStore} from "pinia";

export const useCenterStore = defineStore('center', {
    state: () => ({
        centers: [
            {
                id: 1,
                name: "Gulbog 1",
                location: "Angren, Gulbog' MFY ko'cha-6",
                price: 1500,
                img: new URL('@/assets/removeit/club2.jpg', import.meta.url).href,
                stuff: [
                    {count: 4, name: "PS4"},
                    {count: 6, name: "Billiard"},
                    {count: 3, name: "Caraoke"}
                ],
            },
            {
                id: 2,
                name: "Billiard Club 2",
                location: "Angren. Daha 5/1 Dom 7 ",
                price: 2500,
                img: new URL('@/assets/removeit/club3.jpg', import.meta.url).href,
                stuff: [
                    {count: 6, name: "PS4"},
                    {count: 10, name: "Billiard"},
                    {count: 4, name: "Caraoke"}
                ],
            },
            {
                id: 3,
                name: "Legion Club",
                location: "Angren. Daha 5/1 Dom 11",
                price: 3200,
                img: new URL('@/assets/removeit/club4.jpg', import.meta.url).href,
                stuff: [
                    {count: 8, name: "PS4"},
                    {count: 4, name: "Billiard"},
                    {count: 3, name: "Caraoke"}
                ],
            },
            {
                id: 4,
                name: "Gulbog 2",
                location: "Gulbog MFY kocha-12",
                price: 1800,
                img: new URL('@/assets/removeit/club5.jpg', import.meta.url).href,
                stuff: [
                    {count: 2, name: "PS4"},
                    {count: 3, name: "Billiard"},
                    {count: 3, name: "Caraoke"}
                ],
            },

        ],

        center_stuffs: [
            {
                type: 'PS4',
                price: 10,
                startTime: '19:00',
                endTime: '19:20',
                timer:true,

            }
        ]
    }),
    actions: {},

})
