import { createStorage } from '@/utils/Storage';
import { ACCESS_TOKEN } from '@/store/mutation-types';
const Storage = createStorage({ storage: localStorage });

export interface State {
    token: string;
}

const state: State = {
    token: ''
};

export default state;
