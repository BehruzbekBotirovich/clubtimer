import {defineStore} from "pinia";

export const useEmployeesStore = defineStore('employees', {
    state: () => ({
        employees: [
            {
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
            },
            {
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
            },
            {
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
            },
            {
                id: 4,
                full_name: "Abdullayev Asil Asilovich",
                location: "Город Ангрен, махалля Дустлик, улица Мустакиллик, дом 23, квартира 7.",
                birthday: "Jun 15, 1993",
                price: 1600,
                img: new URL('@/assets/removeit/ava1.jpg', import.meta.url).href,
                position: "Operator",
                working_time: "08:00 - 16:00",
                number: "+998 93 987 65 43",
                pochta: 'namesurname@gmail.com'
            },
            {
                id: 5,
                full_name: "Sharipova Shakhnoza Rustamovna",
                location: "Город Ангрен, махалля Бахор, улица Амира Темура, дом 88",
                birthday: "Sep 10, 1997",
                price: 2000,
                img: new URL('@/assets/removeit/ava3.png', import.meta.url).href,
                position: "Consultant",
                working_time: "12:00 - 21:00",
                number: "+998 94 654 32 10",
                pochta: 'namesurname@gmail.com'
            },
            {
                id: 6,
                full_name: "Nematov Nodirbek Nematovich",
                location: "Город Ангрен, махалля Ёшлик, улица Шарк, дом 5.",
                birthday: "Jan 22, 1990",
                price: 1400,
                img: new URL('@/assets/removeit/ava2.jpg', import.meta.url).href,
                position: "Technician",
                working_time: "07:00 - 15:00",
                number: "+998 95 432 10 98",
                pochta: 'namesurname@gmail.com'
            }
        ]
    }),
    actions: {},

})
