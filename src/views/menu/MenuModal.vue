<template>
    <div class="MenuModalContainer">
        <a-modal
            v-model:visible="addMenuModalVisible"
            @cancel="handleAddClose"
            :title="fields.id === 0 ? '新增菜单' : '编辑菜单'"
            width="400px"
        >
            <a-form
                :model="addMenuParams"
                :label-col="labelCol"
                :wrapper-col="wrapperCol"
            >
                <a-form-item
                    label="菜单名"
                    v-bind="addForm.validateInfos.menuName"
                    required
                >
                    <a-input
                        v-model:value="addMenuParams.menuName"
                        props="menuName"
                    />
                </a-form-item>
                <a-form-item
                    label="菜单类型"
                    v-bind="addForm.validateInfos.menuType"
                    required
                >
                    <a-radio-group
                        name="menuTypeRadioGroup"
                        v-model:value="addMenuParams.menuType"
                    >
                        <a-radio :value="0">目录</a-radio>
                        <a-radio :value="1">菜单</a-radio>
                        <a-radio :value="2">按钮</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="上级菜单">
                    <a-tree-select
                        v-model="addMenuParams.parentId"
                        :default-value="
                            addMenuParams.parentId
                                ? addMenuParams.parentId
                                : undefined
                        "
                        style="width: 100%"
                        :dropdown-style="{
                            maxHeight: '400px',
                            overflow: 'auto'
                        }"
                        :tree-data="props.treeData"
                        :replaceFields="replaceFields"
                        placeholder="请选择上级菜单"
                        tree-default-expand-all
                        @change="handleMenuTreeSelect"
                        allowClear
                    >
                    </a-tree-select>
                </a-form-item>
                <a-form-item
                    label="状态"
                    v-bind="addForm.validateInfos.status"
                    required
                >
                    <a-radio-group
                        name="statusRadioGroup"
                        v-model:value="addMenuParams.status"
                    >
                        <a-radio :value="1">正常</a-radio>
                        <a-radio :value="0">禁用</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item
                    label="是否删除"
                    v-bind="addForm.validateInfos.isDelete"
                    required
                >
                    <a-radio-group
                        name="isDeleteRadioGroup"
                        v-model:value="addMenuParams.isDelete"
                    >
                        <a-radio :value="1">是</a-radio>
                        <a-radio :value="0">否</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="备注" v-bind="addForm.validateInfos.remark">
                    <a-input
                        v-model:value="addMenuParams.remark"
                        props="remark"
                    />
                </a-form-item>
                <a-form-item label="url" v-bind="addForm.validateInfos.url">
                    <a-input v-model:value="addMenuParams.url" props="url" />
                </a-form-item>
                <a-form-item
                    label="权限标志"
                    v-bind="addForm.validateInfos.perms"
                >
                    <a-input
                        v-model:value="addMenuParams.perms"
                        props="perms"
                    />
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
import { addMenuParamsProps } from './index.vue';
import { useForm } from '@ant-design-vue/use';

import { updateById, createMenu } from '@/apis/menu/index';
import { message } from 'ant-design-vue';

interface dataProps {
    addMenuParams: addMenuParamsProps;
    addMenuModalVisible: boolean;
    confirmAddLoading: boolean;
    addRules: any;
    replaceFields: replaceFieldsProps;
}

interface replaceFieldsProps {
    children: string;
    title: string;
    key: string;
    value: string;
}

export default defineComponent({
    name: 'MenuModal',
    props: {
        fields: {
            type: Object,
            default: () => ({})
        },
        treeData: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }) {
        const data: dataProps = reactive({
            addMenuParams: {
                id: 0,
                parentId: 0,
                menuName: '',
                menuType: 0,
                status: 0,
                url: '',
                perms: '',
                remark: '',
                isDelete: 0
            },
            addMenuModalVisible: true,
            confirmAddLoading: false,
            addRules: {
                menuName: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入菜单名',
                        trigger: 'blur'
                    }
                ],
                menuType: [
                    {
                        type: 'number',
                        required: true,
                        message: '请选择菜单类型',
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
                isDelete: [
                    {
                        type: 'number',
                        required: true,
                        message: '请选择是否删除',
                        trigger: 'blur'
                    }
                ]
            },
            replaceFields: {
                children: 'children',
                title: 'menuName',
                key: 'id',
                value: 'id'
            }
        });

        // 有id,则为编辑操作
        if (props.fields.id) {
            Object.keys(data.addMenuParams).forEach(
                key => (data.addMenuParams[key] = props.fields[key])
            );
        } else {
            if (props.fields['parentId']) {
                data.addMenuParams.parentId = JSON.parse(
                    JSON.stringify(props.fields['parentId'])
                );
            }
        }

        const addForm = useForm(data.addMenuParams, data.addRules);

        const handleAddClose = () => {
            emit('closeAddMenuModal');
        };

        const handleAddOk = () => {
            addForm
                .validate()
                .then(async () => {
                    //开启加载动画
                    data.confirmAddLoading = true;
                    try {
                        if (props.fields.id) {
                            const res = await updateById(data.addMenuParams);
                            if (res.code === 1) {
                                message.success(res.message);
                            } else {
                                message.error(res.message);
                            }
                        } else {
                            const { id, ...others } = data.addMenuParams;
                            const res = await createMenu(others);
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
                    emit('closeAddMenuModal');
                });
        };

        const handleMenuTreeSelect = value => {
            data.addMenuParams.parentId = value;
        };

        return {
            ...toRefs(data),
            handleAddClose,
            handleAddOk,
            wrapperCol: { span: 15, offset: 3 },
            labelCol: { span: 6 },
            addForm,
            props,
            handleMenuTreeSelect
        };
    }
});
</script>

<style lang="" scoped>
</style>
