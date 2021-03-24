import { createStorage } from '@/utils/Storage';
import { ACCESS_TOKEN } from '@/store/mutation-types';
const Storage = createStorage({ storage: localStorage });

export interface Tab {
    title: string;
    path: string;
    name: string;
}

export interface State {
    token: string;
    tabList: Tab[];
}

const state: State = {
    token: '',
    tabList: [
        { title: '首页1', path: '/home', name: 'Home' },
        { title: '首页2', path: '/home', name: 'Home' },
        { title: '首页3', path: '/home', name: 'Home' },
        { title: '首页4', path: '/home', name: 'Home' },
        { title: '首页5', path: '/home', name: 'Home' }
    ]
};

export default state;
