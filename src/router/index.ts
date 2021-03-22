import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';

import login from './modules/login';
import notFound from './modules/notFound';
import dashboard from './modules/dashboard';
// import {} from './modules/system'

import { createRouterGuards } from './router-guard';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        redirect: '/dashboard',
        component: () =>
            import(/* webpackChunkName: "layout" */ '@/views/layout/index.vue'),
        children: [...dashboard]
    },
    ...notFound,
    ...login
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default function setupRouter(app: App) {
    app.use(router);
    // 创建路由守卫
    createRouterGuards(router);
}
