import { MutationTree } from 'vuex';

import { State } from './state';
import { MutationType } from './mutation-types';

export interface Mutations<T> {
    [MutationType.SET_TOKEN](state: T, payload: string): void;
}

const mutations: MutationTree<State> & Mutations<State> = {
    [MutationType.SET_TOKEN]: (state, token) => {
        state.token = token;
    }
};

export default mutations;
