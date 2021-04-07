<template>
    <a-sub-menu :key="menuInfo.url">
        <template #title>
            <span>{{ menuInfo.menuName }}</span>
        </template>
        <template v-for="item in menuInfo.children">
            <a-menu-item v-if="item.level < 3" :key="item.url">
                <span>{{ item.menuName }}</span>
            </a-menu-item>
            <menu-item v-else :key="item.url" :menu-info="item" />
        </template>
    </a-sub-menu>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

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
        return {};
    }
});
</script>

<style lang="" scoped>
</style>
