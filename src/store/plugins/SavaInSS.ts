import createPersistedState from 'vuex-persistedstate';
import { noCacheData } from '@/configs/base-config';
import { cloneDeep } from 'lodash-es';

export default createPersistedState({
    key: 'cacheData',
    storage: window.localStorage,
    reducer: data => {
        const CopyData = JSON.parse(JSON.stringify(data));
        for (const key in noCacheData) {
            delete CopyData[noCacheData[key]];
        }
        return CopyData;
    }
});
