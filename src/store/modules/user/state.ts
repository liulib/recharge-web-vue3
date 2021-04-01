import { TOKEN, MENU_LIST } from '@/store/types';
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
    token: string;
    menuList: Menu[];
}

const state: UserState = {
    token: storage.get(TOKEN) || '',
    menuList: storage.get(MENU_LIST) || []
};

export default state;
