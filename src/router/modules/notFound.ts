import { RouteRecordRaw } from 'vue-router';

const routeName = 'notFound';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/notFound',
        name: routeName,
        component: () =>
            import(
                /* webpackChunkName: "notFound" */ '@/views/notFound/index.vue'
            )
    }
];

export default routes;
