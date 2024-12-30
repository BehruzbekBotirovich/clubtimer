import { defineStore } from "pinia";

export const useEmployeesStore = defineStore('employees', {
    state: () => ({
        employees: [
            {
                id: 1,
                full_name: "Palonchiyev palonchi palonchi",
                location: "Warehouse 1",
                birthday: 'Apr 12, 1998',
                price: 1500,
                img: '/src/assets/removeit/ava1.jpg',
                position: "Admin",
                working_time: "11:00 - 22:00",
                number: '+998 90 000 11 22',
                pochta: 'namesurname@gmail.com'

            },
            {
                id: 2,
                full_name: "Ibrohimov Ibrohim Ibrohimovich",
                location: "Warehouse 2",
                birthday: "Feb 5, 1995",
                price: 1800,
                img: "/src/assets/removeit/ava2.jpg",
                position: "Manager",
                working_time: "09:00 - 18:00",
                number: "+998 91 123 45 67",
                pochta: 'namesurname@gmail.com'

            },
            {
                id: 3,
                full_name: "Karimova Saida Qobilovna",
                location: "Warehouse 3",
                birthday: "Mar 25, 2000",
                price: 1700,
                img: "/src/assets/removeit/ava3.png",
                position: "Supervisor",
                working_time: "10:00 - 20:00",
                number: "+998 92 345 67 89",
                pochta: 'namesurname@gmail.com'

            },
            {
                id: 4,
                full_name: "Abdullayev Asil Asilovich",
                location: "Warehouse 4",
                birthday: "Jun 15, 1993",
                price: 1600,
                img: "/src/assets/removeit/ava1.jpg",
                position: "Operator",
                working_time: "08:00 - 16:00",
                number: "+998 93 987 65 43",
                pochta: 'namesurname@gmail.com'
            },
            {
                id: 5,
                full_name: "Sharipova Shakhnoza Rustamovna",
                location: "Warehouse 5",
                birthday: "Sep 10, 1997",
                price: 2000,
                img: "/src/assets/removeit/ava3.png",
                position: "Consultant",
                working_time: "12:00 - 21:00",
                number: "+998 94 654 32 10",
                pochta: 'namesurname@gmail.com'
            },
            {
                id: 6,
                full_name: "Nematov Nodirbek Nematovich",
                location: "Warehouse 6",
                birthday: "Jan 22, 1990",
                price: 1400,
                img: "/src/assets/removeit/ava2.jpg",
                position: "Technician",
                working_time: "07:00 - 15:00",
                number: "+998 95 432 10 98",
                pochta: 'namesurname@gmail.com'
            }
        ]
    }),
    actions: {},

})
