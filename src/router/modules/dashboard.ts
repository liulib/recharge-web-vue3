import { RouteRecordRaw } from 'vue-router';

const routeName = 'dashboard';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        name: routeName,
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
            ),
        meta: {
            title: '系统面板',
            isTabsPage: true
        }
    }
];

export default routes;
