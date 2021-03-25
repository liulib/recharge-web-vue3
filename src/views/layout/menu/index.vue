<template>
    <a-menu
        mode="inline"
        theme="dark"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
    >
        <template v-for="item in menuInfoList">
            <!-- 没有子级菜单直接渲染 -->
            <a-menu-item v-if="!item.children" :key="item.path">
                <span>{{ item.menuTitle }}</span>
            </a-menu-item>

            <!-- 有子级则递归生成子级 -->
            <menuItem v-else :key="item.path"></menuItem>
        </template>
    </a-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import menuItem from './menuItem.vue';

export default defineComponent({
    name: 'LayoutMenu',
    components: { menuItem },
    setup() {
        const state = reactive({
            selectedKeys: ['1'],
            openKeys: ['sub1']
        });
        return { ...toRefs(state) };
    }
});
</script>

<style lang="less" scoped>
.menuContainer {
    background-color: red;
}
</style>