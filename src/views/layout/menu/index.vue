<template>
    <a-menu
        mode="inline"
        theme="dark"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        @click="handleRouteJump"
        @openChange="handleOpenChange"
        @select="handleSelect"
    >
        <template v-for="item in tabsList">
            <!-- 没有子级菜单直接渲染 -->
            <a-menu-item v-if="!item.children" :key="item.url">
                <span>{{ item.menuName }}</span>
            </a-menu-item>

            <!-- 有子级则递归生成子级 -->
            <menuItem v-else :key="item.url" :menuInfo="item"></menuItem>
        </template>
    </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import menuItem from './menuItem.vue';

import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { MutationType } from '@/store/modules/menu/mutation-types';

export default defineComponent({
    name: 'LayoutMenu',
    components: { menuItem },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const openKeys = computed(() => {
            return store.state.menu.openKeys;
        });
        const selectedKeys = computed(() => {
            return store.state.menu.selectedKeys;
        });
        const tabsList = computed(() => {
            return store.state.user.menuList;
        });

        /**
         * 处理路由跳转
         * @param { Object } 跳转携带的参数
         * @item vue实例对象
         * @key key值
         * @keyPath 地址
         */
        const handleRouteJump = ({ key }) => {
            router.push(key);
        };

        /**
         * 处理菜单项状态修改情况
         * @param { Array } patch 必填|对应的菜单信息
         */
        const handleOpenChange = patch => {
            store.commit(MutationType.SET_OPEN_KEYS, patch);
        };

        /**
         * @description: 监听选中事件
         * @param {*} value
         */
        const handleSelect = ({ item, key, selectedKeys }) => {
            console.log(route.matched);

            const openKeys: string[] = [`/${key.split('/')[1]}`];
            const selectKeys: string[] = [key];
            store.commit(MutationType.SET_SELECTED_KEYS, selectKeys);
            store.commit(MutationType.SET_OPEN_KEYS, openKeys);
        };

        return {
            openKeys,
            selectedKeys,
            tabsList,
            handleRouteJump,
            handleOpenChange,
            handleSelect
        };
    }
});
</script>

<style lang="less" scoped>
.menuContainer {
    background-color: red;
}
</style>