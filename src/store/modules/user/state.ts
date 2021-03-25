import { TOKEN, TAB_LIST } from '@/store/types';
import { storage } from '@/utils/Storage';

export interface Tab {
    title: string;
    path: string;
    name: string;
}

export interface UserState {
    token: string;
    tabList: Tab[];
}

const state: UserState = {
    token: storage.get(TOKEN) || '',
    tabList: storage.get(TAB_LIST) || [
        { title: '首页1', path: '/home', name: 'Home' },
        { title: '首页2', path: '/home', name: 'Home' },
        { title: '首页3', path: '/home', name: 'Home' },
        { title: '首页4', path: '/home', name: 'Home' },
        { title: '首页5', path: '/home', name: 'Home' }
    ]
};

export default state;
