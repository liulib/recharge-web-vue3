<template>
    <div class="userModalContainer">
        <a-modal
            v-model:visible="addUserModalVisible"
            title="新增用户"
            width="300px"
        >
            <a-form :model="addUserModalParams">
                <a-form-item
                    label="用户名"
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
            <a-form :model="addUserModalPrams">
                <a-form-item
                    label="密码"
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

interface addUserProps {
    id?: number;
    username: string;
    password: string;
    email?: string;
    mobile?: string;
    ifManager?: number;
    status?: number;
    remark?: string;
    isDelete?: number;
}

interface dataProps {
    confirmAddLoading: boolean;
    addUserParams: addUserProps;
}
export default defineComponent({
    name: 'UserModal',
    props: {
        fields: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props) {
        const data: dataProps = reactive({
            confirmAddLoading: false,
            addUserParams: {
                id: 0,
                username: '',
                password: '',
                email: '',
                mobile: '',
                ifManager: 0,
                status: 0,
                remark: '',
                isDelete: 0
            }
        });
        const handleAddOk = () => {
            console.log('Ok');
        };
        const handleAddCancel = () => {
            console.log('Cancel');
        };
        return {
            ...toRefs(data),
            handleAddOk,
            handleAddCancel
        };
    }
});
</script>

<style lang="" scoped>
</style>
