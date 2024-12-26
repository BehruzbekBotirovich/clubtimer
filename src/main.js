//styles
import '@/styles/tailwind.css';
import './styles/base.scss'; // Import global SCSS here

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// depends
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd);


app.mount('#app')
