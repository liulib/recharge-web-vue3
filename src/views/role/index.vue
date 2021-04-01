<template>
    <div class="roleContainer">
        <a-button type="primary" class="addButton" @click="showAddRoleModal(0)"
            >新增角色</a-button
        >
        <a-table
            :columns="columns"
            :data-source="roleList"
            :loading="tableLoading"
            :pagination="pagination"
            @change="handlePageChange"
            rowKey="id"
            ><template #isDelete="{ record }">
                <a-tag v-if="record.isDelete === 0" color="warning">否</a-tag>
                <a-tag v-if="record.isDelete === 1" color="success"
                    >是</a-tag
                ></template
            >
            <template #createdAt="{ text }">
                {{
                    TimeFormat.getExpectFormat(text, { isUtc: true })
                }}</template
            >
            <template #updatedAt="{ text }">
                {{
                    TimeFormat.getExpectFormat(text, { isUtc: true })
                }}</template
            >

            <template #operation="{ record }">
                <a-button
                    type="primary"
                    @click="showAddRoleModal(1, record)"
                    class="operationButton"
                    >编辑</a-button
                ><a-button type="danger" @click="showDeployMenuModal(record)"
                    >赋权</a-button
                ></template
            >
        </a-table>
        <RoleModal
            v-if="addRoleVisible"
            :fields="addRoleParams"
            @closeAddRoleModal="closeAddRoleModal"
        ></RoleModal>
        <DeployMenu
            v-if="deployMenuVisible"
            :checkedRole="checkedRole"
            @closeDeployMenuModal="closeDeployMenuModal"
        ></DeployMenu>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { message } from 'ant-design-vue';

import { getRoleList, createRole, updateById } from '@/apis/role/index';
import { role, getRoleListReq } from '@/apis/role/types';
import columns from './roleColumns';
import { TimeFormat } from '@/utils/TimeFormat';
import RoleModal from './RoleModal.vue';
import DeployMenu from './DeployMenu.vue';

interface dataProps {
    addRoleVisible: boolean;
    tableLoading: boolean;
    roleList: role[];
    pagination: any;
    reqParams: getRoleListReq;
    addRoleParams: addRoleProps;
    deployMenuVisible: boolean;
    checkedRole: role | null;
}

export interface addRoleProps {
    id: number;
    roleName: string;
    remark: string;
    isDelete: number;
}

export default defineComponent({
    name: 'Role',
    components: { RoleModal, DeployMenu },
    setup() {
        const data: dataProps = reactive({
            addRoleVisible: false,
            tableLoading: false,
            roleList: [],
            reqParams: {
                pageSize: 10,
                pageNumber: 1
            },
            addRoleParams: {
                id: 0,
                roleName: '',
                remark: '',
                isDelete: 0
            },
            // 分页属性
            pagination: {
                current: 1,
                pageSize: 10,
                showQuickJumper: true,
                total: 0,
                showTotal: total => `共 ${total} 条`
            },
            deployMenuVisible: false,
            checkedRole: null
        });

        const getRoleListReq = async () => {
            try {
                // 开启表格加载
                data.tableLoading = true;
                // 赋值分页
                data.reqParams.pageNumber = data.pagination.current;
                data.reqParams.pageSize = data.pagination.pageSize;
                // 请求
                const res = await getRoleList(data.reqParams);
                // 赋值
                data.roleList = res.list;
                data.pagination.total = res.total;

                data.tableLoading = false;
            } catch (error) {
                message.error(error);
                // 关闭表格加载
                data.tableLoading = false;
            }
        };

        const showAddRoleModal = (type: number, editData: role) => {
            // 处理数据
            if (type) {
                for (let item in editData) {
                    data.addRoleParams[item] = editData[item];
                }
            } else {
                data.addRoleParams = {
                    id: 0,
                    roleName: '',
                    remark: '',
                    isDelete: 0
                };
            }
            // 显示对话框
            data.addRoleVisible = true;
        };

        const handlePageChange = data => {
            data.pagination = data;
            getRoleListReq();
        };

        const closeAddRoleModal = () => {
            // 关闭对话框
            data.addRoleVisible = false;
            // 重置参数
            data.reqParams.pageSize = 10;
            data.reqParams.pageNumber = 1;
            // 请求最新数据
            getRoleListReq();
        };

        const closeDeployMenuModal = () => {
            // 关闭对话框
            data.deployMenuVisible = false;
            // 请求最新数据
            getRoleListReq();
        };

        const showDeployMenuModal = value => {
            // 生成选中菜单的数组
            data.checkedRole = JSON.parse(JSON.stringify(value));
            // 显示对话框
            data.deployMenuVisible = true;
        };

        onMounted(() => {
            getRoleListReq();
        });
        return {
            ...toRefs(data),
            showAddRoleModal,
            handlePageChange,
            columns,
            TimeFormat,
            closeAddRoleModal,
            showDeployMenuModal,
            closeDeployMenuModal
        };
    }
});
</script>

<style lang="less" scoped>
.roleContainer {
    .addButton {
        margin-bottom: 20px;
    }
    .operationButton {
        margin-right: 10px;
    }
}
</style>
