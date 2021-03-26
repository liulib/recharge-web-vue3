import { createStore } from 'vuex';
import { App } from 'vue';
// import createPersistedState from './plugins/SavaInSS';

import { UserState } from './modules/user/state';
import { MenuState } from './modules/menu/state';
import { store as user, UserStore } from './modules/user';
import { store as menu, MenuStore } from './modules/menu';

export interface RootState {
    user: UserState;
    menu: MenuState;
}

export type Store = UserStore<Pick<RootState, 'user'>> &
    MenuStore<Pick<RootState, 'menu'>>;

const store = createStore({
    modules: { user, menu }
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
