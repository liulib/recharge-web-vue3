<template>
    <div class="menuContainer">
        <a-button type="primary" class="addButton">新增菜单</a-button>
        <a-table :columns="columns" :data-source="menuTreeData" rowKey="id">
            <template #parentId="{ record }">
                <span>{{ record.parentId }}</span></template
            >
            <template #menuType="{ record }">
                <a-tag v-if="record.menuType === 0" color="#108ee9">目录</a-tag>
                <a-tag v-if="record.menuType === 1" color="#87d068">菜单</a-tag
                ><a-tag v-if="record.menuType === 2" color="f50f50"
                    >按钮</a-tag
                ></template
            >
            <template #status="{ record }">
                <a-tag v-if="record.status === 0" color="warning">禁用</a-tag>
                <a-tag v-if="record.status === 1" color="success"
                    >正常</a-tag
                ></template
            >
            <template #isDelete="{ record }">
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
                <a-button type="primary" class="operationButton"
                    >新增{{ record.id }}</a-button
                ><a-button type="danger">编辑</a-button></template
            >
        </a-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue';
import { Menu } from '@/store/modules/user/state';
import { getMenuAll } from '@/apis/menu/index';
import columns from './menuColumns';
import { toTree } from '@/utils/toTree';
import { message } from 'ant-design-vue';
import { TimeFormat } from '@/utils/TimeFormat';
import { parseParent } from '@/utils/parseParent';

interface dataProps {
    menuTreeData: Menu[] | null;
    tmpParentName: tmpParentNameProps | null;
}

interface tmpParentNameProps {
    id: number;
    name: string;
}

export default defineComponent({
    name: 'Menu',
    components: {},
    setup() {
        const data: dataProps = reactive({
            menuTreeData: null,
            tmpParentName: null
        });

        const getMenuAllReq = async () => {
            try {
                const res = await getMenuAll();
                data.menuTreeData = toTree<Menu>(res);
                // 将父级名称保存为新对象，便于渲染
                console.log(parseParent(data));
                // data.tmpParentName = parseParent(data);
            } catch (error) {
                message.error(error);
            }
        };
        onMounted(() => {
            getMenuAllReq();
        });

        return {
            ...toRefs(data),
            columns,
            TimeFormat
        };
    }
});
</script>

<style lang="less" scoped>
.menuContainer {
    .addButton {
        margin-bottom: 20px;
    }
    .operationButton {
        margin-right: 10px;
    }
}
</style>
