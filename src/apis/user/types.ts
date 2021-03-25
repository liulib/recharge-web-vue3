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
