import { OPEN_KEYS, SELECTED_KEYS, TAB_LIST } from '@/store/types';
import { storage } from '@/utils/Storage';

export interface tab {
    title: string;
    path: string;
    name: string;
}

export interface MenuState {
    openKeys: string[];
    selectedKeys: string[];
    tabList: tab[];
}

const state: MenuState = {
    openKeys: storage.get(OPEN_KEYS) || [],
    selectedKeys: storage.get(SELECTED_KEYS) || [],
    tabList: storage.get(TAB_LIST) || []
};

export default state;
