export default [
    // {
    //     dataIndex: 'name',
    //     key: 'name',
    //     slots: { title: 'customTitle' },
    //     scopedSlots: { customRender: 'name' }
    // },
    {
        title: '用户ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '用户账号',
        dataIndex: 'account',
        key: 'account'
    },
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: '邮箱',
        key: 'email',
        dataIndex: 'email'
    },
    {
        title: '手机号',
        key: 'mobile',
        dataIndex: 'mobile'
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark'
    },
    {
        title: '是否管理员',
        key: 'ifManager',
        dataIndex: 'ifManager',
        slots: { customRender: 'ifManager' }
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        slots: { customRender: 'status' }
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
