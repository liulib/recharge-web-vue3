import http from '@/utils/http/axios';
import { LoginParams } from './types';

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
export function login(params: LoginParams) {
    return http.request({
        url: Api.login,
        method: 'POST',
        params
    });
}
