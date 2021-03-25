import { MutationTree } from 'vuex';

import { UserState } from './state';
import { MutationType } from './mutation-types';

import { Tab } from './state';

export interface Mutations<T = UserState> {
    [MutationType.SET_TOKEN](state: T, payload: string): void;
    [MutationType.SET_TAB_LIST](state: T, payload: Tab[]): void;
}

const mutations: MutationTree<UserState> & Mutations<UserState> = {
    [MutationType.SET_TOKEN]: (state, token) => {
        state.token = token;
    },
    [MutationType.SET_TAB_LIST]: (state, tabList) => {
        state.tabList = tabList;
    }
};

export default mutations;
