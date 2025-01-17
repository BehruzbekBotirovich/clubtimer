<script setup>
import EmployeeDetails from './EmployeeDetails.vue';
import { ref, defineProps } from 'vue';
import { MoreOutlined } from '@ant-design/icons-vue';

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

const open = ref(false);
const showModal = () => {
    open.value = true;
};


</script>

<template>

    <a-modal v-model:open="open" title="Employee info" :footer="false" width="1000px">
        <employee-details></employee-details>
    </a-modal>
    <div class="space-y-4">

        <!-- cards -->
        <a-row v-for="el in data" :key="el.id" :gutter="[20, 20]"
            class="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
            <!-- Avatar and Name -->
            <a-col :lg="6" class="flex items-center gap-4">
                <a-avatar size="large" :src="el.img" />
                <div>
                    <div class="text-base font-semibold">{{ el.full_name }}</div>
                    <div class="text-sm text-gray-500">{{ el.pochta }}</div>
                </div>
            </a-col>
            <a-col :lg="7">
                <div class="text-xs text-gray-400 text-left">place</div>
                <div class="text-sm text-gray-600 text-left">{{ el.location }} </div>
            </a-col>
            <a-col :lg="2">
                <div class="text-xs text-gray-400 text-left">Birthday</div>
                <div class="text-sm text-gray-600 text-left">{{ el.birthday }}</div>
            </a-col>
            <a-col :lg="3">
                <div class="text-xs text-gray-400 text-left">Phone Number</div>
                <div class="text-sm text-gray-600 text-left">{{ el.number }}</div>
            </a-col>

            <a-col :lg="2">
                <div class="text-xs text-gray-400 text-left">Position</div>
                <div class="text-sm text-gray-600 text-left">{{ el.position }}</div>
            </a-col>
            <a-col :lg="3">
                <div class="text-xs text-gray-400 text-left">Working time</div>
                <div class="text-sm text-gray-600 text-left">{{ el.working_time }}</div>
            </a-col>

            <!-- Actions -->
            <a-col :lg="1">
                <button class="bg-gray-100 p-2 rounded-lg" @click="showModal(el.id)">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5ZM14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12ZM12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z"
                            fill="#0A1629" />
                     </svg>
                </button>
            </a-col>

        </a-row>

    </div>

</template>

<style scoped>
.shadow-md {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
