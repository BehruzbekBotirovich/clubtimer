import { defineStore } from 'pinia';

export const useTeachersStore = defineStore('teachers', {
    state: () => ({
        teachersList: [
            {
                id: 1,
                fio: ' Begi Behzod Beki',
                age: 32,
                address: 'somewhere',
                number: '99 080 00 00',
                cafedra: 'Fiz-mat'
            },
            {
                id: 2,
                fio: ' Begi Behzod Beki',
                age: 32,
                address: 'somewhere',
                number: '99 080 00 00',
                cafedra: 'Fiz-mat'
            }, {
                id: 3,
                fio: ' Begi Behzod Beki',
                age: 32,
                address: 'somewhere',
                number: '99 080 00 00',
                cafedra: 'Fiz-mat'
            }, {
                id: 4,
                fio: ' Begi Behzod Beki',
                age: 32,
                address: 'somewhere',
                number: '99 080 00 00',
                cafedra: 'Fiz-mat'
            }, {
                id: 5,
                fio: ' Begi Behzod Beki',
                age: 32,
                address: 'somewhere',
                number: '99 080 00 00',
                cafedra: 'Fiz-mat'
            }, {
                id: 6,
                fio: ' Begi Behzod Beki',
                age: 32,
                address: 'somewhere',
                number: '99 080 00 00',
                cafedra: 'Fiz-mat'
            },


        ]

    }),
    actions: {


    }
});

