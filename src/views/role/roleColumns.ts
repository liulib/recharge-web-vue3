export default [
    {
        title: '角色ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '角色名',
        dataIndex: 'roleName',
        key: 'roleName'
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark'
    },
    {
        title: '是否删除',
        key: 'isDelete',
        dataIndex: 'isDelete',
        slots: { customRender: 'isDelete' }
    },
    {
        title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
        slots: { customRender: 'createdAt' }
    },
    {
        title: '更新时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        slots: { customRender: 'updatedAt' }
    },
    {
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
        width: '200px'
    }
];
