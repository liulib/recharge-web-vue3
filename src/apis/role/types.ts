import { menu } from '@/apis/menu/types';

export interface role {
    id: number;
    roleName: string;
    remark: string;
    isDelete: number;
    createdAt: string;
    updatedAt: string;
    menus?: menu[];
}

export interface getRoleListReq {
    pageNumber: number;
    pageSize: number;
}

export interface getRoleListRes {
    list: role[];
    total: number;
    pageNum: number;
    pageSize: number;
}

export interface createRoleReq {
    roleName: string;
    remark?: string;
    isDelete?: number;
}

export interface updateByIdReq {
    id: number;
    roleName: string;
    remark?: string;
    isDelete: number;
}

export interface deployMenuReq {
    id: number;
    menus?: string;
}
