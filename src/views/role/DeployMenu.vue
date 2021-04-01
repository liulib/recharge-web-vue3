<template>
    <div class="deployMenuContainer">
        <a-modal
            v-model:visible="deployMenuVisable"
            @cancel="handleAddClose"
            title="赋权"
            width="400px"
        >
            <a-tree
                v-if="menuTreeData.length"
                checkable
                :tree-data="menuTreeData"
                :replaceFields="replaceFields"
                :defaultExpandAll="true"
                :checkStrictly="true"
                :checkedKeys="checkedKeys"
                @check="handleCheck"
            />
            <template #footer>
                <a-button
                    key="submit"
                    type="primary"
                    :loading="confirmAddLoading"
                    @click="handleAddOk"
                    >确认</a-button
                >
            </template>
        </a-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, computed } from 'vue';
import { getMenuAll } from '@/apis/menu/index';
import { toTree } from '@/utils/toTree';

import { Menu } from '@/store/modules/user/state';
import { message } from 'ant-design-vue';

import { deployMenu } from '@/apis/role/index';

interface dataProps {
    menus: string;
    deployMenuVisable: boolean;
    confirmAddLoading: boolean;
    menuTreeData: Menu[];
    replaceFields: replaceFieldsProps;
    checkedKeys: checkedKeysProps;
}

interface replaceFieldsProps {
    children: string;
    title: string;
    key: string;
}

interface checkedKeysProps {
    checked: number[];
    halfChecked: number[];
}

export default defineComponent({
    name: 'DeployMenu',
    props: {
        checkedRole: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }) {
        const data: dataProps = reactive({
            menus: '',
            menuTreeData: [],
            deployMenuVisable: true,
            confirmAddLoading: false,
            replaceFields: {
                children: 'children',
                title: 'menuName',
                key: 'id'
            },
            checkedKeys: { checked: [], halfChecked: [] }
        });

        // 赋值数据
        data.checkedKeys.checked = props.checkedRole.menus.map(item => {
            return item.id;
        });

        const handleAddClose = () => {
            // 关闭对话框
            emit('closeDeployMenuModal');
        };

        const handleAddOk = async () => {
            // 开启加载动画
            data.confirmAddLoading = true;
            try {
                // 拼装参数
                const params = {
                    id: props.checkedRole.id,
                    menus: data.checkedKeys.checked.join(',')
                };
                // 请求
                deployMenu(params)
                    .then(res => {
                        // 判断结果反馈
                        if (res.code === 1) {
                            message.success(res.message);
                        } else {
                            message.error(res.message);
                        }
                    })
                    .finally(() => {
                        // 关闭加载动画
                        data.confirmAddLoading = false;
                        // 关闭对话框
                        emit('closeDeployMenuModal');
                    });
            } catch (error) {
                message.error(error);
                // 关闭加载动画
                data.confirmAddLoading = false;
            }
        };

        const handleCheck = checkedKeys => {
            data.checkedKeys = checkedKeys;
        };

        const getMenuAllReq = async () => {
            try {
                const res = await getMenuAll();
                data.menuTreeData = toTree<Menu>(res);
            } catch (error) {
                message.error(error);
            }
        };
        onMounted(() => {
            getMenuAllReq();
        });

        return {
            ...toRefs(data),
            handleAddClose,
            handleAddOk,
            handleCheck
        };
    }
});
</script>

<style lang="" scoped>
</style>
