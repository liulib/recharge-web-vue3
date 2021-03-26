import { RouteRecordRaw } from 'vue-router';

const routeName = 'source';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/source',
        name: routeName,
        component: () => import('@/views/transfer/index.vue'),
        redirect: '/source/good',
        meta: {
            title: '资源管理'
        },
        children: [
            {
                path: 'good',
                name: `${routeName}-good`,
                meta: {
                    title: '商品管理'
                },
                component: () =>
                    import(
                        /* webpackChunkName: "system-good" */ '@/views/good/index.vue'
                    )
            }
        ]
    }
];

export default routes;
