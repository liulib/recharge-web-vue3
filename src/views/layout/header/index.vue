<template>
    <a-layout-header class="layoutHeader">
        <div class="headerLeft">
            <span>当前位置：</span>
            <a-breadcrumb>
                <template
                    v-for="routeItem in route.matched"
                    :key="routeItem.name"
                >
                    <a-breadcrumb-item>
                        <a>{{ routeItem.meta.title }}</a>
                    </a-breadcrumb-item>
                </template>
            </a-breadcrumb>
        </div>
        <div class="headerRight">
            <span class="headerSpan">
                <UserOutlined /> 您好，{{ username }}
            </span>
            <span
                class="headerSpan"
                style="cursor: pointer"
                @click="() => (visible = true)"
            >
                <LoginOutlined />
                退出登录
            </span>
        </div>
    </a-layout-header>
    <a-modal
        title="退出系统"
        :confirm-loading="confirmLoading"
        :visible="visible"
        :closable="false"
    >
        <template #footer>
            <a-button key="back" @click="() => (visible = false)"
                >取消</a-button
            >
            <a-button
                key="submit"
                type="primary"
                :loading="loading"
                @click="handleConfirm"
                >确认</a-button
            >
        </template>
        <p>退出系统后需要重新登录，您是否继续？</p>
    </a-modal>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
import { UserOutlined, LoginOutlined } from '@ant-design/icons-vue';
import { storage } from '@/utils/Storage';

interface dataProps {
    confirmLoading: boolean;
    visible: boolean;
    loading: boolean;
}

export default defineComponent({
    name: 'LayoutHeader',
    components: { UserOutlined, LoginOutlined },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const state: dataProps = reactive({
            confirmLoading: false,
            visible: false,
            loading: false
        });

        const username = computed(() => store.state.user.username);

        const handleConfirm = () => {
            // 执行退出动画
            state.loading = true;

            // 执行退出操作 清空所有缓存
            storage.clear();

            // 关闭加载动画
            state.loading = false;

            router.replace('/login').finally(() => location.reload());
        };

        return { route, username, handleConfirm, ...toRefs(state) };
    }
});
</script>

<style lang="less" scoped>
.layoutHeader {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .headerLeft {
        display: flex;
        align-items: center;
    }
    .headerRight {
        .headerSpan {
            margin-left: 20px;
        }
    }
}
</style>