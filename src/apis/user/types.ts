/**
 * @description: 登陆接口参数
 */
export interface LoginReq {
    username: string;
    password: string;
}

export interface LoginRes {
    token: string;
    menuList: [];
}

export interface getUserListReq {
    pageNumber: number;
    pageSize: number;
    username?: string;
    mobile?: string;
    status?: number;
    ifManage?: number;
    ifDelete?: number;
    created?: string;
    updated?: string;
}

export interface user {
    id: number;
    username: string;
    password: string;
    email?: string;
    mobile?: string;
    ifManager: number;
    status: number;
    remark?: string;
    isDelete: number;
    createdAt: string;
    updatedAt: string;
}

export interface getUserListRes {
    list: user[];
    total: number;
    pageNum: number;
    pageSize: number;
}
