import { RouteRecordRaw } from 'vue-router';

const routeName = 'system';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/system',
        name: routeName,
        component: () => import('@/views/transfer/index.vue'),
        redirect: '/system/user',
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: 'user',
                name: `${routeName}-user`,
                meta: {
                    title: '用户管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-user" */ '@/views/user/index.vue'
                    )
            },
            {
                path: 'role',
                name: `${routeName}-role`,
                meta: {
                    title: '角色管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-role" */ '@/views/role/index.vue'
                    )
            },
            {
                path: 'menu',
                name: `${routeName}-menu`,
                meta: {
                    title: '菜单管理',
                    isTabsPage: true
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-menu" */ '@/views/menu/index.vue'
                    )
            }
        ]
    }
];

export default routes;
