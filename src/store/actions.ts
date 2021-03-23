import { login } from '@/apis/user/user';
import { MutationType } from './mutation-types';

import { ActionContext, ActionTree } from 'vuex';
import { State } from './state';
import { Mutations } from './mutations';

import { ReqParams } from '@/views/login/types';

export enum UserActionTypes {
    Login = 'LOGIN'
}

interface Actions {
    [UserActionTypes.Login](context: any, userInfo: ReqParams): Promise<any>;
}

const actions: ActionTree<State, any> & Actions = {
    // 登录
    async [UserActionTypes.Login]({ commit }, userInfo) {
        try {
            const response = await login(userInfo);
            const { code, data, message: msg } = response;
            if (code === 1) {
                commit(MutationType.SET_TOKEN, data);
            }
            return Promise.resolve(response);
        } catch (e) {
            return Promise.reject(e);
        }
    }
};

export default actions;
