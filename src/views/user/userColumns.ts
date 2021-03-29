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
        title: '用户账户',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' }
    },
    {
        title: 'Action',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }
];
