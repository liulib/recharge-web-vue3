import http from '@/utils/http/axios';
import { getRoleAllRes } from './types';

enum Api {
    getRoleAll = '/role/getRoleAll'
}

/**
 * @description: 用户登录
 */
export function getRoleAll() {
    return http.request<getRoleAllRes[]>({
        url: Api.getRoleAll,
        method: 'GET'
    });
}
