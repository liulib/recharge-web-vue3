import { isNavigationFailure, Router } from 'vue-router';
import store from '@/store';
import NProgress from 'nprogress'; // progress bar

import { whiteList } from '@/configs/base_config';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const loginRoutePath = '/login';
const defaultRoutePath = '/dashboard';

export function createRouterGuards(router: Router) {
    router.beforeEach((to, from, next) => {
        NProgress.start(); // start progress bar
        // const token = storage.get(ACCESS_TOKEN);
        const token = null;
        if (token) {
            if (to.name === 'login') {
                next({ path: defaultRoutePath });
                NProgress.done();
            } else {
                next();
            }
        } else {
            console.log(to.name);
            // not login
            if (whiteList.includes(to.name as string)) {
                // 在免登录名单，直接进入
                next();
            } else {
                next({
                    path: loginRoutePath,
                    query: { redirect: to.fullPath },
                    replace: true
                });
                NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
            }
        }
    });

    router.afterEach((to, from, failure) => {
        document.title = (to?.meta?.title as string) || document.title;
        if (isNavigationFailure(failure)) {
            console.log('failed navigation', failure);
        }
        NProgress.done(); // finish progress bar
    });

    router.onError(error => {
        console.log(error, '路由错误');
    });
}
