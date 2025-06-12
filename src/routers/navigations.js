import {h} from 'vue'
import IconAccount from '../components/icons/IconAccount.vue'
// views components
import AccountsView from '../pages/dashboard/accounts/AccountsView.vue'
import EmployeesPage from "@/pages/dashboard/employees/EmployeesPage.vue";
import IconTripleUser from "@/components/icons/IconTripleUser.vue";
import StatisticsPage from "@/pages/dashboard/statistics/StatisticsPage.vue";
import CentersPage from "@/pages/dashboard/centers/CentersPage.vue";
import IconSales from "@/components/icons/IconSales.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import TariffPage from "@/pages/dashboard/tariff/TariffPage.vue";

const navigations = [
    {
        path: 'centers',
        name: 'CentersView',
        component: CentersPage,
        meta: {
            showMenu: true,
            icon: () => h(IconSales)
        },
    },
    {
        path: 'employees',
        name: 'EmployeesView',
        component: EmployeesPage,
        meta: {
            showMenu: true,
            icon: () => h(IconTripleUser)
        },
    },
    {
        path: 'statistics',
        name: 'StatisticsView',
        component: StatisticsPage,
        meta: {
            showMenu: true,
            icon: () => h(IconAccount)
        },
    },
    {
        path: 'settings',
        name: 'SettingsView',
        component: TariffPage,
        meta: {
            showMenu: true,
            icon: () => h(IconSettings)
        },
    }
]
export default navigations
