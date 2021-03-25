import http from '@/utils/http/axios';
import { LoginReq, LoginRes } from './types';

enum Api {
    login = '/auth/login',
    logout = '/auth/logout',
    createUser = '/user',
    changePwd = '/user/changePwd',
    getUserList = '/user/getUserList',
    deployRole = '/user/deployRole'
}

/**
 * @description: 用户登录
 */
export function login(params: LoginReq) {
    return http.request<LoginRes>(
        {
            url: Api.login,
            method: 'POST',
            params
        },
        { isTransformRequestResult: true }
    );
}
