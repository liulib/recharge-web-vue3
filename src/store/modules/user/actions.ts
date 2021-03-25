import { login } from '@/apis/user/user';
import { MutationType } from './mutation-types';

import { ActionContext, ActionTree } from 'vuex';
import { UserState } from './state';
import { Mutations } from './mutations';

import { LoginReq, LoginRes } from '@/apis/user/types';

import { UserActionTypes } from './action-types';

import { RootState } from '@/store';
import { storage } from '@/utils/Storage';

import { TOKEN, TAB_LIST } from '@/store/types';

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, RootState>, 'commit'>;

export interface Actions {
    [UserActionTypes.Login](
        context: AugmentedActionContext,
        userInfo: LoginReq
    ): Promise<any>;
}

const actions: ActionTree<UserState, RootState> & Actions = {
    // 登录
    async [UserActionTypes.Login]({ commit }, userInfo) {
        try {
            const response = await login(userInfo);

            commit(MutationType.SET_TOKEN, response.token);
            commit(MutationType.SET_TAB_LIST, response.menuList);

            storage.set(TOKEN, response.token);
            storage.set(TAB_LIST, response.menuList);

            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(e);
        }
    }
};

export default actions;
