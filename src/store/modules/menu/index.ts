import {
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
    Module
} from 'vuex';

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from '@/store';
import { MenuState } from './state';

import state from './state';
import mutations, { Mutations } from './mutations';
// import actions, { Actions } from './actions';

export type MenuStore<S = MenuState> = Omit<
    VuexStore<S>,
    'getters' | 'commit' | 'dispatch'
> & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
};
export const store: Module<MenuState, RootState> = {
    state,
    mutations
};
