import { createStore } from 'vuex';
import { App } from 'vue';
// import createPersistedState from './plugins/SavaInSS';

import { UserState } from './modules/user/state';
import { store as user, UserStore } from './modules/user';

export interface RootState {
    user: UserState;
}

export type Store = UserStore<Pick<RootState, 'user'>>;

const store = createStore({
    modules: { user }
    // plugins: [createPersistedState]
});

export function setupStore(app: App) {
    app.use(store);
}

// 定义你自己的“useStore”组合函数
export function useStore() {
    return store as Store;
}

export default store;
