<template>
    <div class="userModalContainer">
        <a-modal
            v-model:visible="addUserVisible"
            @cancel="handleAddClose"
            :title="fields.id === 0 ? '新增用户' : '编辑用户'"
            width="400px"
        >
            <a-form
                :model="addUserParams"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-item
                    label="用户名"
                    v-bind="addForm.validateInfos.username"
                    required
                    has-feedback
                >
                    <a-input
                        :disabled="fields.id !== 0"
                        v-model:value="addUserParams.username"
                        props="username"
                    />
                </a-form-item>
                <a-form-item
                    v-if="fields.id === 0"
                    label="密码"
                    v-bind="addForm.validateInfos.password"
                    required
                    has-feedback
                >
                    <a-input
                        v-model:value="addUserParams.password"
                        props="password"
                    />
                </a-form-item>
                <a-form-item
                    label="手机号"
                    v-bind="addForm.validateInfos.mobile"
                >
                    <a-input
                        v-model:value="addUserParams.mobile"
                        props="mobile"
                    />
                </a-form-item>
                <a-form-item label="邮箱" v-bind="addForm.validateInfos.email">
                    <a-input
                        v-model:value="addUserParams.email"
                        props="email"
                    />
                </a-form-item>
                <a-form-item
                    label="是否管理员"
                    v-bind="addForm.validateInfos.ifManager"
                    required
                >
                    <a-radio-group
                        name="ifManagerRadioGroup"
                        v-model:value="addUserParams.ifManager"
                    >
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item
                    label="状态"
                    v-bind="addForm.validateInfos.status"
                    required
                >
                    <a-radio-group
                        name="statusRadioGroup"
                        v-model:value="addUserParams.status"
                    >
                        <a-radio :value="1">正常</a-radio>
                        <a-radio :value="0">禁用</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="备注" v-bind="addForm.validateInfos.remark">
                    <a-input
                        v-model:value="addUserParams.remark"
                        props="email"
                    />
                </a-form-item>
                <a-form-item
                    label="是否删除"
                    v-bind="addForm.validateInfos.isDelete"
                    required
                >
                    <a-radio-group
                        name="isDeleteRadioGroup"
                        v-model:value="addUserParams.isDelete"
                    >
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="角色" v-bind="addForm.validateInfos.roles">
                    <a-select
                        mode="multiple"
                        placeholder="请选择角色"
                        :default-value="selectRoleList"
                        @change="handleChange"
                    >
                        <a-select-option
                            v-for="item in roleList"
                            :value="item.id"
                            :key="item.id"
                            >{{ item.roleName }}</a-select-option
                        >
                    </a-select>
                </a-form-item>
            </a-form>

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
import { defineComponent, reactive, toRefs, onMounted, watch } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { addUserProps } from './index.vue';
import { checkUsername } from '@/views/login/validate';
import { getRoleAll } from '@/apis/role/index';
import { role } from '@/apis/role/types';
import { createUser, updateUser } from '@/apis/user/user';
import { message } from 'ant-design-vue';
import { updateUserReq } from '@/apis/user/types';

interface dataProps {
    confirmAddLoading: boolean;
    addUserParams: addUserProps;
    addUserVisible: boolean;
    addRules: any;
    roleList: role[];
    selectRoleList: number[];
}

export default defineComponent({
    name: 'UserModal',
    props: {
        fields: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }) {
        const data: dataProps = reactive({
            confirmAddLoading: false,
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
            addRules: {
                username: [
                    {
                        validator: checkUsername,
                        trigger: 'blur'
                    }
                ],
                status: [
                    {
                        type: 'number',
                        required: true,
                        message: '请选择状态',
                        trigger: 'blur'
                    }
                ],
                ifManager: [
                    {
                        type: 'number',
                        required: true,
                        message: '请选择是否管理员',
                        trigger: 'blur'
                    }
                ],
                isDelete: [
                    {
                        type: 'number',
                        required: true,
                        message: '请选择是否删除',
                        trigger: 'blur'
                    }
                ]
            },
            addUserVisible: true,
            roleList: [],
            selectRoleList: []
        });

        // 默认值用于回显用户之前的角色
        if (
            props.fields.roles !== undefined &&
            props.fields.roles.replace(/(^\s*)|(\s*$)/g, '') !== ''
        ) {
            data.selectRoleList = props.fields.roles
                .split(',')
                .map(item => Number(item));
            // 没有触发change事件的时候需要有默认值不然就会被赋值成''
            data.addUserParams.roles = JSON.parse(
                JSON.stringify(props.fields.roles)
            );
        }

        // 有id,则为编辑操作
        if (props.fields.id) {
            Object.keys(data.addUserParams).forEach(
                key => (data.addUserParams[key] = props.fields[key])
            );
        }

        const addForm = useForm(data.addUserParams, data.addRules);

        const handleAddOk = () => {
            addForm
                .validate()
                .then(async () => {
                    //开启加载动画
                    data.confirmAddLoading = true;
                    try {
                        if (props.fields.id) {
                            // 更新
                            const {
                                username,
                                password,
                                ...others
                            } = data.addUserParams;
                            const res = await updateUser(others);
                            if (res.code === 1) {
                                message.success(res.message);
                            } else {
                                message.error(res.message);
                            }
                        } else {
                            // 创建
                            const { id, ...others } = data.addUserParams;
                            const res = await createUser(others);
                            if (res.code === 1) {
                                message.success(res.message);
                            } else {
                                message.error(res.message);
                            }
                        }
                    } catch (error) {
                        message.error(error);
                    }
                })
                .finally(() => {
                    // 关闭加载动画
                    data.confirmAddLoading = false;
                    // 关闭对话框
                    emit('closeAddUserModal');
                });
        };

        const handleAddClose = () => {
            emit('closeAddUserModal');
        };

        const handleChange = (value: string[]) => {
            data.addUserParams.roles = value.join(',');
        };
        /**
         * @description: 获取全部角色列表
         */
        const getRoleAllReq = async () => {
            try {
                data.roleList = await getRoleAll();
            } catch (error) {
                message.error(error);
            }
        };

        onMounted(() => {
            getRoleAllReq();
        });

        return {
            ...toRefs(data),
            handleAddOk,
            handleAddClose,
            addForm,
            handleChange,
            wrapperCol: { span: 15, offset: 3 },
            labelCol: { span: 6 }
        };
    }
});
</script>

<style lang="" scoped>
</style>
