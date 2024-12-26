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
      path: '/',
      name: 'Asosiy sahifa',
      redirect: "/dashboard"
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/dashboard/DashboardPage.vue'),
      children: [
        {
          path: '',
          redirect: 'dashboard/lessons'
        },
        {
          path: 'lessons',
          name: 'lessons',
          component: () => import('@/pages/dashboard/lessons/LessonsPage.vue'),
        },
        {
          path: 'clients',
          name: 'clients',
          component: () => import("@/pages/dashboard/clients/ClientsPage.vue")
        },
        {
          path: 'teachers',
          name: 'teachers',
          component: () => import("@/pages/dashboard/teachers/TeachersPage.vue")
        },
        {
          path: 'teacher-info',
          name: 'teacher info',
          component: () => import("@/pages/dashboard/teachers/components/TeacherInfo.vue")
        },
        {
          path: 'tasks',
          name: 'tasks',
          component: () => import("@/pages/dashboard/tasks/TasksPage.vue")
        },
        // path ichida 500 qaytarishga 
        {
          path: '500',
          component: () => import('@/pages/_500.vue'),
          name: 'dashboard_internal_server_error'
        },
      ]
    },
    // globalno 500 qaytarishga 
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

export default router

