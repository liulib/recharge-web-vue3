import { RouteRecordRaw } from 'vue-router';

const routeName = 'login';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: routeName,
        meta: {
            title: '登录页面'
        },
        component: () =>
            import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    }
];

export default routes;
