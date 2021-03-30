import http from '@/utils/http/axios';
import {
    LoginReq,
    LoginRes,
    getUserListReq,
    getUserListRes,
    changePwdReq
} from './types';

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
    return http.request<LoginRes>({
        url: Api.login,
        method: 'POST',
        params
    });
}

/**
 * @description: 用户列表
 */
export function getUserList(params: getUserListReq) {
    return http.request<getUserListRes>({
        url: Api.getUserList,
        method: 'GET',
        params
    });
}

/**
 * @description: 修改密码
 */
export function changePwd(params: changePwdReq) {
    return http.request(
        {
            url: Api.changePwd,
            method: 'POST',
            params
        },
        { isTransformRequestResult: false }
    );
}
