<template>
    <div class="LayoutContent">
        <a-tabs
            v-model:activeKey="activeKey"
            type="editable-card"
            @edit="editTabs"
            @change="changeTabs"
            hideAdd
        >
            <a-tab-pane
                v-for="item in tabsList"
                :key="item.menuName"
                :tab="item.menuName"
            ></a-tab-pane>

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

        const tabsList = computed(() => {
            return store.state.user.tabList;
        });

        // console.log(tabsList);
        // tabsList.value.forEach(item => {
        //     console.log(item);
        // });

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
            route,
            tabsList
        };
    }
});
</script>

<style scoped>
</style>