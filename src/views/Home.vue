<template>
    <div class="home">
        <h1>Welcome to Your Vue.js + TypeScript App</h1>
        <a-button type="primary">this</a-button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {}
})
export default class Home extends Vue {}
</script>
