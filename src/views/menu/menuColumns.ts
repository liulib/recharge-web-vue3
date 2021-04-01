export default [
    {
        title: '菜单ID',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '菜单名称',
        dataIndex: 'menuName',
        key: 'menuName'
    },
    {
        title: '菜单类型',
        dataIndex: 'menuType',
        key: 'menuType',
        slots: { customRender: 'menuType' }
    },
    {
        title: '父级菜单',
        dataIndex: 'parentId',
        key: 'parentId',
        slots: { customRender: 'parentId' }
    },
    {
        title: '权限标志',
        dataIndex: 'perms',
        key: 'perms'
    },
    {
        title: 'URL',
        dataIndex: 'url',
        key: 'url'
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark'
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        slots: { customRender: 'status' }
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
