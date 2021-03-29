import http from '@/utils/http/axios';
import { LoginReq, LoginRes, getUserListReq, getUserListRes } from './types';

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

/**
 * @description: 用户列表
 */
export function getUserList(params: getUserListReq) {
    return http.request<getUserListRes>(
        {
            url: Api.getUserList,
            method: 'GET',
            params
        },
        { isTransformRequestResult: true }
    );
}
