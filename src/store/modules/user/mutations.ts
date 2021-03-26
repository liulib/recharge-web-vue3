import { MutationTree } from 'vuex';

import { UserState } from './state';
import { MutationType } from './mutation-types';
import { storage } from '@/utils/Storage';

import { TOKEN, MENU_LIST } from '@/store/types';

import { Menu } from './state';

export interface Mutations<T = UserState> {
    [MutationType.SET_TOKEN](state: T, payload: string): void;
    [MutationType.SET_MENU_LIST](state: T, payload: Menu[]): void;
}

const mutations: MutationTree<UserState> & Mutations<UserState> = {
    [MutationType.SET_TOKEN]: (state, token) => {
        state.token = token;
        storage.set(TOKEN, token);
    },
    [MutationType.SET_MENU_LIST]: (state, menuList) => {
        state.menuList = menuList;
        storage.set(MENU_LIST, menuList);
    }
};

export default mutations;
