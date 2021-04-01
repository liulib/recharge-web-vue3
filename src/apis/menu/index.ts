import http from '@/utils/http/axios';
import { menu, createMenuReq, updateById } from './types';

enum Api {
    getMenuAll = '/menu/getMenuAll',
    createMenu = '/menu',
    updateById = '/menu/updateById'
}

/**
 * @description: 获取全部菜单权限
 */
export function getMenuAll() {
    return http.request<menu[]>({
        url: Api.getMenuAll,
        method: 'GET'
    });
}

/**
 * @description: 创建菜单
 */
export function createMenu(params: createMenuReq) {
    return http.request({
        url: Api.getMenuAll,
        method: 'POST',
        params
    });
}

/**
 * @description: 更新菜单
 */
export function updateById(params) {
    return http.request({
        url: Api.updateById,
        method: 'POST',
        params
    });
}
