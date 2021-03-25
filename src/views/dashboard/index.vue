<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { MutationType } from '@/store/modules/user/mutation-types';

export default defineComponent({
    setup() {
        const store = useStore();
        return {};
    }
});
</script>

<style scoped>
</style>