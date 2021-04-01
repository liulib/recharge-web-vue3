<template>
    <div class="userContainer">
        <a-button type="primary" class="addButton" @click="showAddUserModal(0)"
            >新增用户</a-button
        >
        <a-table
            :columns="columns"
            :data-source="userList"
            :loading="tableLoading"
            :pagination="pagination"
            @change="handlePageChange"
            rowKey="id"
        >
            <template #status="{ record }">
                <a-tag v-if="record.status === 0" color="warning">禁用</a-tag>
                <a-tag v-if="record.status === 1" color="success"
                    >正常</a-tag
                ></template
            >
            <template #ifManager="{ record }">
                <a-tag v-if="record.ifManager === 0" color="warning">否</a-tag>
                <a-tag v-if="record.ifManager === 1" color="success"
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
                    @click="showAddUserModal(1, record)"
                    class="operationButton"
                    >编辑</a-button
                ><a-button type="danger" @click="showChangePwdModal(record.id)"
                    >修改密码</a-button
                ></template
            >
        </a-table>
        <a-modal
            v-model:visible="changePwdVisible"
            title="修改密码"
            width="300px"
        >
            <a-form :model="changePwdPrams">
                <a-form-item
                    label="新密码"
                    v-bind="changeForm.validateInfos.password"
                    required
                    has-feedback
                >
                    <a-input
                        v-model:value="changePwdPrams.password"
                        props="password"
                    />
                </a-form-item>
            </a-form>
            <template #footer>
                <a-button
                    key="submit"
                    type="primary"
                    :loading="confirmChangeLoading"
                    @click="handleChangeOk"
                    >确认</a-button
                >
            </template>
        </a-modal>
        <UserModal
            v-if="addUserVisible"
            :fields="addUserParams"
            @closeAddUserModal="closeAddUserModal"
        ></UserModal>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import {
    getUserListReq,
    getUserListRes,
    user,
    changePwdReq
} from '@/apis/user/types';
import { getUserList, changePwd } from '@/apis/user/user';
import { message } from 'ant-design-vue';
import columns from './userColumns';
import { TimeFormat } from '@/utils/TimeFormat';
import { checkPassword } from '@/views/login/validate';
import { useForm } from '@ant-design-vue/use';
import { RuleObject } from 'ant-design-vue/es/form/interface';
import UserModal from './UserModal.vue';

export interface changeRules {
    password: [
        {
            validator: (rule: RuleObject, value: string) => Promise<void>;
            trigger: string;
        }
    ];
}

export interface addUserProps {
    id?: number;
    username: string;
    password: string;
    email?: string;
    mobile?: string;
    ifManager?: number;
    status?: number;
    remark?: string;
    isDelete?: number;
    roles?: string;
}

interface dataProps {
    resData: getUserListRes | null;
    reqParams: getUserListReq;
    userList: user[];
    changePwdVisible: boolean;
    changePwdPrams: changePwdReq;
    changeRules: changeRules;
    confirmChangeLoading: boolean;
    tableLoading: boolean;
    addUserParams: addUserProps;
    addUserVisible: boolean;
    pagination: any;
}

export default defineComponent({
    name: 'User',
    components: { UserModal },
    setup() {
        const state: dataProps = reactive({
            resData: null,
            reqParams: {
                pageSize: 10,
                pageNumber: 1
            },
            userList: [],
            changePwdVisible: false,
            changePwdPrams: { id: 0, password: '' },
            changeRules: {
                password: [
                    {
                        validator: checkPassword,
                        trigger: 'blur'
                    }
                ]
            },
            tableLoading: false,
            confirmChangeLoading: false,
            addUserParams: {
                id: 0,
                username: '',
                password: '',
                email: '',
                mobile: '',
                ifManager: 0,
                status: 1,
                remark: '',
                isDelete: 0,
                roles: ''
            },
            addUserVisible: false,
            // 分页属性
            pagination: {
                current: 1,
                pageSize: 10,
                showQuickJumper: true,
                total: 0,
                showTotal: total => `共 ${total} 条`
            }
        });

        const changeForm = useForm(state.changePwdPrams, state.changeRules);

        const showChangePwdModal = id => {
            state.changePwdPrams.id = id;
            state.changePwdVisible = true;
        };

        const handleChangeOk = () => {
            changeForm.validate().then(async () => {
                await changePwdReq().finally(() => {
                    // 关闭对话框
                    state.changePwdVisible = false;
                    // 清空表单
                    changeForm.resetFields();
                });
            });
        };

        const changePwdReq = async () => {
            try {
                // 开启按钮加载
                state.confirmChangeLoading = true;
                // 请求
                const res = await changePwd(state.changePwdPrams);
                // 关闭按钮加载
                state.confirmChangeLoading = false;
                // 判断结果 提示
                if (res.code === 1) {
                    message.success('修改成功');
                    // 请求新数据
                    getUserListReq();
                } else {
                    message.error(res.message);
                }
            } catch (error) {
                message.error(error);
            }
        };

        const getUserListReq = async () => {
            try {
                // 开启表格加载
                state.tableLoading = true;
                // 赋值分页
                state.reqParams.pageNumber = state.pagination.current;
                state.reqParams.pageSize = state.pagination.pageSize;
                //请求
                state.resData = await getUserList(state.reqParams);
                state.userList = state.resData.list;
                state.pagination.total = state.resData.total;
                // 关闭表格加载
                state.tableLoading = false;
            } catch (error) {
                message.error(error);
                // 关闭表格加载
                state.tableLoading = false;
            }
        };

        const closeAddUserModal = () => {
            // 关闭对话框
            state.addUserVisible = false;
            // 请求最新数据
            getUserListReq();
        };

        const showAddUserModal = (type: number, editData: user) => {
            // 处理数据
            if (type) {
                for (let item in editData) {
                    if (item === 'roles') {
                        state.addUserParams[item] = editData[item]
                            .map(element => {
                                return element.id;
                            })
                            .join(',');
                    } else {
                        state.addUserParams[item] = editData[item];
                    }
                }
            } else {
                state.addUserParams = {
                    id: 0,
                    username: '',
                    password: '',
                    email: '',
                    mobile: '',
                    ifManager: 0,
                    status: 1,
                    remark: '',
                    isDelete: 0,
                    roles: ''
                };
            }
            // 显示对话框
            state.addUserVisible = true;
        };

        const handlePageChange = data => {
            state.pagination = data;
            getUserListReq();
        };

        onMounted(() => {
            getUserListReq();
        });

        return {
            ...toRefs(state),
            columns,
            TimeFormat,
            changePwd,
            showChangePwdModal,
            handleChangeOk,
            changeForm,
            closeAddUserModal,
            showAddUserModal,
            handlePageChange
        };
    }
});
</script>

<style lang="less" scoped>
.userContainer {
    .addButton {
        margin-bottom: 20px;
    }
    .operationButton {
        margin-right: 10px;
    }
}
</style>
