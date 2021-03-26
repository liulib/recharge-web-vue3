<template>
    <a-tabs type="editable-card" @edit="editTabs" @change="changeTabs" hideAdd>
        <a-tab-pane
            v-for="item in tabsList"
            :key="item.path"
            :tab="item.title"
        ></a-tab-pane>

        <!-- <template v-slot:tabBarExtraContent>
            <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
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
        </template> -->
    </a-tabs>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, computed } from 'vue';
import { useStore } from '@/store';

import { DownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'Tabs',
    components: { DownOutlined },
    setup() {
        const store = useStore();

        const tabList = computed(() => {
            return store.state.menu.tabList;
        });

        console.log('--------++++++++');
        console.log(tabList);

        const editTabs = value => console.log(value);
        const changeTabs = value => console.log(value);
        const reloadPage = value => console.log(value);
        const removeTab = value => console.log(value);

        return {
            editTabs,
            changeTabs,
            reloadPage,
            removeTab,
            activeKey: ref('1'),
            tabList
        };
    }
});
</script>

<style lang="" scoped>
</style>
