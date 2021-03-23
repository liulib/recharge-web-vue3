import { createStore } from 'vuex';
import { App } from 'vue';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import createPersistedState from './plugins/SavaInSS';

const store = createStore({
    state,
    getters,
    mutations,
    actions,
    modules: {},
    plugins: [createPersistedState]
});

export function setupStore(app: App) {
    app.use(store);
}

// 定义你自己的“useStore”组合函数
export function useStore() {
    return store;
}

export default store;
