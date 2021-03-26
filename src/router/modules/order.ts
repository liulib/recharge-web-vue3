import { RouteRecordRaw } from 'vue-router';

const routeName = 'order';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/order',
        name: routeName,
        component: () => import('@/views/transfer/index.vue'),
        redirect: '/order/customer',
        meta: {
            title: '订单管理'
        },
        children: [
            {
                path: 'customer',
                name: `${routeName}-customer`,
                meta: {
                    title: '下游订单'
                },
                component: () =>
                    import(
                        /* webpackChunkName: "order-customer" */ '@/views/customerOrder/index.vue'
                    )
            }
        ]
    }
];

export default routes;
