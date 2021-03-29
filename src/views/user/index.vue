<template>
    <div class="userContainer">
        <!-- <a-table :columns="columns" :data-source="userData"> -->
        <!-- <a slot="name" slot-scope="text">{{ text }}</a>
            <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
            <span slot="tags" slot-scope="tags">
                <a-tag
                    v-for="tag in tags"
                    :key="tag"
                    :color="
                        tag === 'loser'
                            ? 'volcano'
                            : tag.length > 5
                            ? 'geekblue'
                            : 'green'
                    "
                >
                    {{ tag.toUpperCase() }}
                </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
                <a>Invite 一 {{ record.name }}</a>
                <a-divider type="vertical" />
                <a>Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link">
                    More actions <a-icon type="down" />
                </a>
            </span> -->
        <!-- </a-table> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { getUserListReq, getUserListRes } from '@/apis/user/types';
import { getUserList } from '@/apis/user/user';
import { message } from 'ant-design-vue';

interface dataProps {
    userData: getUserListRes | null;
    reqParams: getUserListReq;
}

export default defineComponent({
    name: 'User',
    components: {},
    setup() {
        const state: dataProps = reactive({
            userData: null,
            reqParams: {
                pageSize: 5,
                pageNumber: 1
            }
        });
        const getData = async () => {
            try {
                const userData = await getUserList(state.reqParams);
                console.log(userData);
            } catch (error) {
                message.error(error);
            }
        };
        getData();
        return {
            ...toRefs(state)
        };
    }
});
</script>

<style lang="" scoped>
</style>
