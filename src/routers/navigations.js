import {h} from 'vue'
import IconAccount from '../components/icons/IconAccount.vue'
// views components
import EmployeesPage from "@/pages/dashboard/employees/EmployeesPage.vue";
import IconTripleUser from "@/components/icons/IconTripleUser.vue";
import StatisticsPage from "@/pages/dashboard/statistics/StatisticsPage.vue";
import CentersPage from "@/pages/dashboard/centers/CentersPage.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import TariffPage from "@/pages/dashboard/settings/SettingPage.vue";
import ProductsPage from "@/pages/dashboard/products/ProductsPage.vue";
import IconProduct from "@/components/icons/IconProduct.vue";
import IconCenterBuilding from "@/components/icons/IconCenterBuilding.vue";
import CenterInfo from "@/pages/dashboard/centers/views/OneCenterPage/OneCenterView.vue";
import CentersView from "@/pages/dashboard/centers/views/CentersView.vue";
import TariffSettingsPage from "@/pages/dashboard/settings/pages/TariffSetting/TariffSettingsPage.vue";
import DevicePricePage from "@/pages/dashboard/settings/pages/DevicePrice/DevicePricePage.vue";
import IconDevicePrice from "@/components/icons/IconDevicePrice.vue";
import IconCoin from "@/components/icons/IconCoin.vue";

const navigations = [
    {
        path: 'centers',
        name: 'CentersPage',
        component: CentersPage,
        redirect: {name: 'CentersView'},
        meta: {
            showMenu: true,
            icon: () => h(IconCenterBuilding)
        },
        children: [
            {
                path: '',
                name: 'CentersView',
                component: CentersView,
            },
            {
                path: 'devices/:id',
                name: 'Devices',
                component: CenterInfo,
            },
        ]
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
        path: 'products',
        name: 'ProductsView',
        component: ProductsPage,
        meta: {
            showMenu: true,
            icon: () => h(IconProduct)
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
        redirect: {name: 'TariffView'},
        meta: {
            showMenu: true,
            icon: () => h(IconSettings)
        },
        children: [
            {
                path: 'tariff',
                name: 'TariffView',
                component: TariffSettingsPage,
                meta: {
                    showMenu: true,
                    icon: () => h(IconCoin)

                },
            },
            {
                path: 'device',
                name: 'DevicesSetting',
                component: DevicePricePage,
                meta: {
                    showMenu: true,
                    icon: () => h(IconDevicePrice)
                },
            },
        ]
    }
]
export default navigations
