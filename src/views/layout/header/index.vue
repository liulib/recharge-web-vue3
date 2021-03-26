<template>
    <a-layout-header class="layoutHeader"
        ><span class="headerTitle">资产管理系统</span>
        <span>当前位置：</span>
        <a-breadcrumb>
            <template v-for="routeItem in route.matched" :key="routeItem.name">
                <a-breadcrumb-item>
                    <a>{{ routeItem.meta.title }}</a>
                </a-breadcrumb-item>
            </template>
        </a-breadcrumb>
    </a-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
    name: 'LayoutHeader',
    setup() {
        const route = useRoute();
        return { route };
    }
});
</script>

<style lang="less" scoped>
.layoutHeader {
    background-color: #fff;
    display: flex;
    align-items: center;
    .headerTitle {
        margin-right: 60px;
    }
}
</style>