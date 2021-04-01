import http from '@/utils/http/axios';
import {
    role,
    createRoleReq,
    updateByIdReq,
    getRoleListRes,
    deployMenuReq
} from './types';

enum Api {
    getRoleAll = '/role/getRoleAll',
    createRole = '/role',
    updateById = '/role/updateById',
    deployMenu = '/role/deployMenu',
    getRoleList = '/role/getRoleList'
}

/**
 * @description: 获取全部角色
 */
export function getRoleAll() {
    return http.request<role[]>({
        url: Api.getRoleAll,
        method: 'GET'
    });
}

/**
 * @description: 分页获取角色
 */
export function getRoleList(params) {
    return http.request<getRoleListRes>({
        url: Api.getRoleList,
        method: 'GET',
        params
    });
}

/**
 * @description: 创建角色
 */
export function createRole(params: createRoleReq) {
    return http.request(
        {
            url: Api.createRole,
            method: 'POST',
            params
        },
        { isTransformRequestResult: false }
    );
}

/**
 * @description: 更新角色
 */
export function updateById(params: updateByIdReq) {
    return http.request(
        {
            url: Api.updateById,
            method: 'POST',
            params
        },
        { isTransformRequestResult: false }
    );
}

/**
 * @description: 给角色赋权
 */
export function deployMenu(params: deployMenuReq) {
    return http.request(
        {
            url: Api.deployMenu,
            method: 'POST',
            params
        },
        { isTransformRequestResult: false }
    );
}
