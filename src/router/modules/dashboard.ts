import { RouteRecordRaw } from 'vue-router';

const routeName = 'dashboard';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/dashboard',
        name: routeName,
        component: () =>
            import(
                /* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'
            )
    }
];

export default routes;
