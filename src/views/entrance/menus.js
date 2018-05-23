const menus = [
    {
        id: 100001,
        mid: '100001',
        name: '系统',
        code: '100001',
        sort_no: '100001',
        asParent: true,
        hasChild: true,
        level: 1,
        children: [
            {
                id: 100001100001,
                name: '数据字典',
                code: '100001100001',
                sort_no: '100001100001',
                url: '',
                asParent: false,
                hasChild: false,
                parent_id: 100001,
                parent_mid: '100001',
                level: 2
            },
            {
                id: 100001100002,
                name: '菜单及授权',
                code: '100001100002',
                sort_no: '100001100002',
                url: '',
                asParent: false,
                hasChild: false,
                parent_id: 100001,
                parent_mid: '100001',
                level: 2
            }
        ]
    },
    {
        id: 100002,
        name: '商户',
        code: '100002',
        sort_no: '100002',
        asParent: true,
        hasChild: true,
        level: 1,
        children: [
            {
                id: 100002100001,
                name: '商户及店铺',
                code: '100002100001',
                sort_no: '100002100001',
                url: '',
                asParent: false,
                hasChild: false,
                parent_id: 100002,
                parent_mid: '100002',
                level: 2
            },
            {
                id: 100002100002,
                name: '券生成/发放',
                code: '100002100002',
                sort_no: '100002100002',
                url: '',
                asParent: false,
                hasChild: false,
                parent_id: 100002,
                parent_mid: '100002',
                level: 2
            },
            {
                id: 100002100002,
                name: '券消费/回收',
                code: '100002100002',
                sort_no: '100002100002',
                url: '',
                asParent: false,
                hasChild: false,
                parent_id: 100002,
                parent_mid: '100002',
                level: 2
            }
        ]
    },
    {
        id: 100003,
        name: '运维',
        code: '100003',
        sort_no: '100003',
        asParent: true,
        hasChild: true,
        level: 1,
        children: [
            {
                id: 100003100001,
                name: '用户维护',
                code: '100003100001',
                sort_no: '100003100001',
                url: '',
                asParent: false,
                hasChild: false,
                parent_id: 100003,
                parent_mid: '100003',
                level: 2
            },
            {
                id: 100003100001,
                name: '聚焦点维护',
                code: '100003100002',
                sort_no: '100003100002',
                url: '',
                asParent: false,
                hasChild: false,
                parent_id: 100003,
                parent_mid: '100003',
                level: 2
            },
            {
                id: 100003100002,
                name: '铝热诱导维护',
                code: '100003100003',
                sort_no: '100003100003',
                url: '',
                asParent: false,
                hasChild: false,
                parent_id: 100003,
                parent_mid: '100003',
                level: 2
            }
        ]
    }
];

export default menus;