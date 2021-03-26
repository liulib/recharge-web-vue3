<template>
    <div class="LayoutContent">
        <Tabs></Tabs>
        <div class="contentBox">
            <a-card><router-view></router-view></a-card>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '@/store';

import Tabs from '../tabs/index.vue';

export default defineComponent({
    name: 'LayoutContent',
    components: { Tabs },
    setup() {
        const route = useRoute();
        const store = useStore();

        const tabsList = computed(() => {
            return store.state.user.menuList;
        });

        // console.log(tabsList);
        // tabsList.value.forEach(item => {
        //     console.log(item);
        // });

        return {};
    }
});
</script>

<style scoped>
</style>