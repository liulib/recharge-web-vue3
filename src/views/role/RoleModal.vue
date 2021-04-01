<template>
    <div class="roleModalContainer">
        <a-modal
            v-model:visible="addRoleVisible"
            @cancel="handleAddClose"
            :title="fields.id === 0 ? '新增角色' : '编辑角色'"
            width="400px"
        >
            <a-form
                :model="addRoleParams"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-item
                    label="角色名"
                    v-bind="addForm.validateInfos.roleName"
                    required
                >
                    <a-input
                        v-model:value="addRoleParams.roleName"
                        props="roleName"
                    />
                </a-form-item>
                <a-form-item label="备注" v-bind="addForm.validateInfos.remark">
                    <a-input
                        v-model:value="addRoleParams.remark"
                        props="remark"
                    />
                </a-form-item>
                <a-form-item
                    label="是否删除"
                    v-bind="addForm.validateInfos.isDelete"
                    required
                >
                    <a-radio-group
                        name="isDeleteRadioGroup"
                        v-model:value="addRoleParams.isDelete"
                    >
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>
                    </a-radio-group>
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
import { defineComponent, reactive, toRefs } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { addRoleProps } from './index.vue';

import { createRole, updateById } from '@/apis/role/index';

import { message } from 'ant-design-vue';

interface dataProps {
    addRoleVisible: boolean;
    confirmAddLoading: boolean;
    addRoleParams: addRoleProps;
    addRules: any;
}

export default defineComponent({
    name: 'RoleModal',
    props: {
        fields: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    setup(props, { emit }) {
        const data: dataProps = reactive({
            addRoleVisible: true,
            confirmAddLoading: false,
            addRoleParams: {
                id: 0,
                roleName: '',
                remark: '',
                isDelete: 0
            },
            addRules: {
                roleName: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入角色名',
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
            }
        });

        // 有id,则为编辑操作
        if (props.fields.id) {
            Object.keys(data.addRoleParams).forEach(
                key => (data.addRoleParams[key] = props.fields[key])
            );
        }

        const addForm = useForm(data.addRoleParams, data.addRules);

        const handleAddClose = () => {
            emit('closeAddRoleModal');
        };

        const handleAddOk = () => {
            addForm
                .validate()
                .then(async () => {
                    //开启加载动画
                    data.confirmAddLoading = true;
                    try {
                        if (props.fields.id) {
                            const res = await updateById(data.addRoleParams);
                            if (res.code === 1) {
                                message.success(res.message);
                            } else {
                                message.error(res.message);
                            }
                        } else {
                            const { id, ...others } = data.addRoleParams;
                            const res = await createRole(others);
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
                    emit('closeAddRoleModal');
                });
        };

        return {
            ...toRefs(data),
            handleAddClose,
            handleAddOk,
            addForm,
            wrapperCol: { span: 15, offset: 3 },
            labelCol: { span: 6 }
        };
    }
});
</script>

<style lang="" scoped>
</style>
