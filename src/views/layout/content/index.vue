<template>
    <div class="LayoutContent">
        <Tabs class="tabs"></Tabs>
        <div class="contentBox">
            <a-card><router-view></router-view></a-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Tabs from '../tabs/index.vue';

export default defineComponent({
    name: 'LayoutContent',
    components: { Tabs },
    setup() {
        return {};
    }
});
</script>

<style lang="less" scoped>
.LayoutContent {
    ::v-deep(.tabs) {
        .ant-tabs-bar {
            padding: 4px 20px 0 10px;
            margin: 0;
            background-color: white;
            user-select: none;
        }
        .ant-tabs-tabpane {
            display: none;
        }
        .ant-tabs-tab:not(.ant-tabs-tab-active) {
            .anticon-close {
                width: 0;
                transition: width 0.3s;
            }
            &:hover .anticon-close {
                width: 16px;
            }
        }
    }
    .contentBox {
        height: calc(100vh - 120px);
        overflow: auto;
    }
}
</style>