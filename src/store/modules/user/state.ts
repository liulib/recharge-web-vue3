import { TOKEN, MENU_LIST, USER_NAME } from '@/store/types';
import { storage } from '@/utils/Storage';

export interface Menu {
    id: number;
    parentId: number;
    menuName: string;
    menuType: number;
    status: number;
    url: string;
    perms: string;
    remark: null | string;
    isDelete: number;
    createdAt: string;
    updatedAt: string;
    level: number;
    children?: Menu[];
}

export interface UserState {
    username: string;
    token: string;
    menuList: Menu[];
}

const state: UserState = {
    token: storage.get(TOKEN) || '',
    menuList: storage.get(MENU_LIST) || [],
    username: storage.get(USER_NAME) || ''
};

export default state;
