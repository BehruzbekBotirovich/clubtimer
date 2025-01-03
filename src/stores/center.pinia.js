import { defineStore } from "pinia";

export const useCenterStore = defineStore('center', {
    state: () => ({
        centers: [
            {
                id: 1,
                name: "Item A",
                location: "Warehouse 1",
                price: 1500,
                img: '/src/assets/removeit/club2.jpg',
                stuff: [
                    { count: 2, name: "PS4" },
                    { count: 3, name: "Billiard" },
                    { count: 3, name: "Caraoke room" }
                ],
            },
            {
                id: 2,
                name: "Item B",
                location: "Warehouse 2",
                price: 2500,
                img: '/src/assets/removeit/club3.jpg',
                stuff: [
                    { count: 2, name: "PS4" },
                    { count: 3, name: "Billiard" },
                    { count: 3, name: "Caraoke room" }
                ],
            },
            {
                id: 3,
                name: "Item C",
                location: "Warehouse 3",
                price: 3200,
                img: '/src/assets/removeit/club4.jpg',
                stuff: [
                    { count: 2, name: "PS4" },
                    { count: 3, name: "Billiard" },
                    { count: 3, name: "Caraoke room" }
                ],
            },
            {
                id: 4,
                name: "Item D",
                location: "Warehouse 4",
                price: 1800,
                img: '/src/assets/removeit/club5.jpg',
                stuff: [
                    { count: 2, name: "PS4" },
                    { count: 3, name: "Billiard" },
                    { count: 3, name: "Caraoke room" }
                ],
            },
            {
                id: 5,
                name: "Item E",
                location: "Warehouse 5",
                price: 2800,
                img: '/src/assets/removeit/club2.jpg',
                stuff: [
                    { count: 2, name: "PS4" },
                    { count: 3, name: "Billiard" },
                    { count: 3, name: "Caraoke room" }
                ],
            },
            {
                id: 6,
                name: "Item F",
                location: "Warehouse 6",
                price: 2000,
                img: '/src/assets/removeit/club3.jpg',
                stuff: [
                    { count: 2, name: "PS4" },
                    { count: 3, name: "Billiard" },
                    { count: 3, name: "Caraoke room" }
                ],
            },
            
        ]
    }),
    actions: {},

})
