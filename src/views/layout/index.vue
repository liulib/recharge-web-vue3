<template>
    <a-layout class="layoutBox">
        <LayoutHeader></LayoutHeader>
        <a-layout>
            <a-layout-sider class="layoutSider"
                ><LayoutMenu></LayoutMenu
            ></a-layout-sider>
            <a-layout-content><LayoutContent></LayoutContent></a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutHeader from './header/index.vue';
import LayoutMenu from './menu/index.vue';
import LayoutContent from './content/index.vue';

export default defineComponent({
    name: 'Layout',
    components: {
        LayoutHeader,
        LayoutMenu,
        LayoutContent
    },
    setup() {
        return {};
    }
});
</script>

<style lang="less" scoped>
.layoutBox {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: skyblue;
    .layoutSider {
        background-color: #fff;
    }
}
</style>