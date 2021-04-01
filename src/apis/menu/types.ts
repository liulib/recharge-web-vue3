export interface menu {
    createdAt: string;
    id: number;
    isDelete: number;
    menuName: string;
    menuType: number;
    parentId: number;
    perms?: string;
    remark?: string;
    status: number;
    updatedAt: string;
    url?: string;
}

export interface createMenuReq {
    parentId?: number;
    menuName: string;
    menuType: number;
    status?: number;
    url?: string;
    perms?: string;
    remark?: string;
    isDelete?: number;
}

export interface updateById {
    id: number;
    parentId?: number;
    menuName: string;
    menuType: number;
    status?: number;
    url?: string;
    perms?: string;
    remark?: string;
    isDelete?: number;
}
