import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/LoginPage.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/RegisterPage.vue')
        },
        {
            path: '/',
            name: 'Asosiy sahifa',
            redirect: 'cabinet'
        },
        {
            path: '/cabinet',
            name: 'cabinet',
            component: () => import('@/pages/cabinet/CabinetPage.vue'),
            children: [
                {
                    path: '',
                    name: 'cabinet-default', // Добавлено имя
                    redirect: 'cabinet/dashboard'
                },
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: () => import('@/pages/cabinet/dashboard/DashboardPage.vue'),
                },
                {
                    path: 'income',
                    name: 'income',
                    component: () => import('@/pages/cabinet/income/IncomePage.vue'),
                },
                {
                    path: 'employees',
                    name: 'employees',
                    component: () => import("@/pages/cabinet/employees/EmployeesPage.vue")
                },
                {
                    path: 'centers',
                    name: 'centers',
                    component: () => import("@/pages/cabinet/centers/CentersPage.vue")
                },
                {
                    path: 'centers/:id',
                    name: 'center-info',
                    component: () => import("@/pages/cabinet/centers/components/CenterInfo.vue")
                },
                {
                    path: 'setting',
                    name: 'setting',
                    component: () => import("@/pages/cabinet/setting/SettingPage.vue")
                },
                {
                    path: '500',
                    component: () => import('@/pages/_500.vue'),
                    name: 'dashboard_internal_server_error'
                },
            ]
        },
        {
            path: '/500',
            component: () => import('@/pages/_500.vue'),
            name: 'internal_server_error'
        },
        {
            path: '/404',
            component: () => import('@/pages/_404.vue'),
            name: 'not_found_main'
        },
    ]
})

// Навигационный守атель для проверки авторизации
router.beforeEach((to, from, next) => {
    const isLogined = Boolean(localStorage.getItem('token'));
    console.log(isLogined)
    if (to.name !== 'Login' && !isLogined) {
        if (to.name === 'register') {
            next();
        } else {
            next({ name: 'Login' });
        }
    } else {
        next();
    }
});


export default router

