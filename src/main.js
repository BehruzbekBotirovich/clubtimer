//styles
import '@/styles/tailwind.scss';
import './styles/base.scss'; // Import global SCSS here

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";

// depends
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd);
app.component("VueApexCharts", VueApexCharts);


app.mount('#app')
