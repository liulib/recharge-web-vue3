import { MutationTree } from 'vuex';

import { UserState } from './state';
import { MutationType } from './mutation-types';
import { storage } from '@/utils/Storage';

import { TOKEN, MENU_LIST, USER_NAME } from '@/store/types';

import { Menu } from './state';

export interface Mutations<T = UserState> {
    [MutationType.SET_TOKEN](state: T, payload: string): void;
    [MutationType.SET_MENU_LIST](state: T, payload: Menu[]): void;
    [MutationType.SET_USER_NAME](state: T, payload: string): void;
}

const mutations: MutationTree<UserState> & Mutations<UserState> = {
    [MutationType.SET_TOKEN]: (state, token) => {
        state.token = token;
        storage.set(TOKEN, token);
    },
    [MutationType.SET_MENU_LIST]: (state, menuList) => {
        state.menuList = menuList;
        storage.set(MENU_LIST, menuList);
    },
    [MutationType.SET_USER_NAME]: (state, username) => {
        state.username = username;
        storage.set(USER_NAME, username);
    }
};

export default mutations;
