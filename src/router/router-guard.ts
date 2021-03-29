import { isNavigationFailure, Router } from 'vue-router';
import NProgress from 'nprogress'; // progress bar

import { storage } from '@/utils/Storage';
import { whiteList } from '@/configs/base-config';
import { ACCESS_TOKEN } from '@/store/modules/user/mutation-types';
import { TOKEN, MENU_LIST } from '@/store/types';
import { useStore } from '@/store';

import { MutationType } from '@/store/modules/menu/mutation-types';
import { tab } from '@/store/modules/menu/state';

const loginRoutePath = '/login';
const defaultRoutePath = '/dashboard';
const store = useStore();

export function createRouterGuards(router: Router) {
    router.beforeEach((to, from, next) => {
        NProgress.start();
        // 获取localStorage中的数据
        const token = storage.get(TOKEN) ? storage.get(TOKEN) : null;
        // 存在token 则直接跳转页面
        if (token) {
            if (to.name === 'login') {
                next({ path: defaultRoutePath });
                NProgress.done();
            } else {
                // 判断是否需要添加到tabs标签
                if (to.meta.isTabsPage) {
                    const tabsItem: tab = {
                        name: to.name as string,
                        title: to.meta.title as string,
                        path: to.path
                    };
                    store.commit(MutationType.ADD_TAB_LIST, tabsItem);
                }
                next();
            }
        } else {
            // 未登录
            if (whiteList.includes(to.name as string)) {
                // 在免登录名单，直接进入
                next();
            } else {
                // 跳转到登录页并带上跳转前的路径
                next({
                    path: loginRoutePath,
                    query: { redirect: to.path },
                    replace: true
                });
                NProgress.done();
            }
        }
    });

    router.afterEach((to, from, failure) => {
        document.title = (to?.meta?.title as string) || document.title;
        if (isNavigationFailure(failure)) {
            console.log('failed navigation', failure);
        }
        NProgress.done();
    });

    router.onError(error => {
        console.log(error, '路由错误');
    });
}
