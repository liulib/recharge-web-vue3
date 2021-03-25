<template>
    <div class="container">user</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
interface dataProps {}
export default defineComponent({
    name: '',
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
