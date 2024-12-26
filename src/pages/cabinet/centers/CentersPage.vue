<template>
    <!-- search -->
    <div>
        <a-row>
            <a-col> </a-col>
        </a-row>
    </div>

    <!-- table -->
    <div>
        <a-table :columns="columns" :data-source="teachersList" rowKey="id">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'fio'">
                    <router-link v-if="!regionId" :to="``">
                        {{ record[column.key] }}
                    </router-link>

                </template>

            </template>

        </a-table>

    </div>
</template>

<script setup>
import { useTeachersStore } from '@/stores/teachers.pinia';

// Получение данных из хранилища
const store = useTeachersStore();
const teachersList = store.teachersList;

// Определение столбцов таблицы
const columns = [
    { title: 'Name', dataIndex: 'fio' },
    { title: 'Age', dataIndex: 'age' },
    { title: 'Address', dataIndex: 'address' },
    { title: 'Kafedra', dataIndex: 'cafedra' },
    { title: 'Number', dataIndex: 'number' }
];
</script>