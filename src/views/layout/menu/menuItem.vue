<template>
    <a-sub-menu :key="menuInfo.path">
        <template #title>
            <span>{{ menuInfo.menuTitle }}</span>
        </template>
        <template v-for="item in menuInfo.children">
            <a-menu-item v-if="!item.children" :key="item.path">
                <span>{{ item.menuTitle }}</span>
            </a-menu-item>
            <menu-item v-else :key="item.path" :menu-info="item" />
        </template>
    </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
interface dataProps {}
export default defineComponent({
    name: 'menuItem',
    props: {
        menuInfo: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    setup() {
        const data: dataProps = reactive({});
        return {
            ...toRefs(data)
        };
    }
});
</script>

<style lang="" scoped>
</style>
