<template>
    <div class="LayoutContent">
        <a-tabs
            v-model:activeKey="activeKey"
            type="editable-card"
            @edit="editTabs"
            @change="changeTabs"
            hideAdd
        >
            <a-tab-pane key="1" tab="Tab 1"></a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2"></a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3"></a-tab-pane>

            <template v-slot:tabBarExtraContent>
                <a-dropdown>
                    <a
                        class="ant-dropdown-link"
                        @click="e => e.preventDefault()"
                    >
                        <down-outlined :style="{ fontSize: '20px' }" />
                    </a>
                    <template #overlay>
                        <a-menu style="user-select: none">
                            <a-menu-item
                                @click="reloadPage"
                                :disabled="activeKey !== route.fullPath"
                                key="1"
                            >
                                刷新
                            </a-menu-item>
                            <a-menu-item @click="removeTab(route)" key="2">
                                关闭
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </template>
        </a-tabs>
        <div class="contentBox">
            <a-card><router-view></router-view></a-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';

import { DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'LayoutContent',
    components: { DownOutlined },
    setup() {
        const route = useRoute();
        const store = useStore();

        const tabsList = computed(() => store.state);

        console.log(tabsList);

        const editTabs = value => console.log(value);
        const changeTabs = value => console.log(value);
        const reloadPage = value => console.log(value);
        const removeTab = value => console.log(value);
        return {
            activeKey: ref('1'),
            editTabs,
            changeTabs,
            reloadPage,
            removeTab,
            route
        };
    }
});
</script>

<style scoped>
</style>