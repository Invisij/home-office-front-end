export const adminMenu = [
    {
        name: 'Người dùng',
        menus: [
            {
                name: 'Quản lý người dùng',
                link: '/system/user-manage',
            },
            {
                name: 'Tạo người dùng',
                link: '/system/user-create',
            },
        ],
    },
    {
        name: 'Danh mục',
        menus: [
            {
                name: 'Quản lý danh mục chính',
                link: '/system/main-cat-manage',
            },
            {
                name: 'Quản lý danh mục phụ',
                link: '/system/sub-cat-manage',
            },
        ],
    },
    {
        name: 'Khuyến mãi',
        menus: [
            {
                name: 'Quản lý khuyến mãi',
                link: '/system/discount-manage',
            },
            {
                name: 'Tạo khuyến mãi',
                link: '/system/discount-create',
            },
        ],
    },
    {
        name: 'Sản phẩm',
        menus: [
            {
                name: 'Quản lý sản phẩm',
                link: '/system/product-manage',
            },
            {
                name: 'Tạo sản phẩm',
                link: '/system/product-create',
            },
        ],
    },
    {
        name: 'Đơn hàng',
        menus: [
            {
                name: 'Quản lý đơn hàng',
                link: '/system/order-manage',
            },
        ],
    },

    // {
    //     //hệ thống
    //     name: 'menu.system.header',
    //     menus: [
    //         {
    //             name: 'menu.system.system-administrator.header',
    //             subMenus: [
    //                 {
    //                     name: 'menu.system.system-administrator.user-manage',
    //                     link: '/system/user-manage',
    //                 },
    //                 {
    //                     name: 'menu.system.system-administrator.product-manage',
    //                     link: '/system/product-manage',
    //                 },
    //                 {
    //                     name: 'menu.system.system-administrator.register-package-group-or-account',
    //                     link: '/system/register-package-group-or-account',
    //                 },
    //             ],
    //         },
    //         // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    //     ],
    // },
];
