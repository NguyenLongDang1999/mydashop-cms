export default [
    {
        label: 'Bảng điều khiển',
        children: [
            {
                title: 'Thống kê',
                to: '/'
            }
        ]
    },
    {
        label: 'Quản lý sản phẩm',
        children: [
            {
                title: 'Danh mục',
                to: `${ROUTER.PRODUCT_CATEGORY}`
            },
            {
                title: 'Thương hiệu',
                to: `${ROUTER.PRODUCT_BRAND}`
            },
            {
                title: 'Thuộc tính',
                to: `${ROUTER.PRODUCT_ATTRIBUTE}`
            },
            {
                title: 'Bộ sưu tập',
                to: `${ROUTER.PRODUCT_COLLECTION}`
            },
            {
                title: 'Flash Deals',
                to: `${ROUTER.PRODUCT_FLASH_DEALS}`
            },
            {
                title: 'Coupons',
                to: '/coupons'
            },
            {
                title: 'Sản phẩm',
                to: `${ROUTER.PRODUCT}`
            }
        ]
    },
    {
        label: 'Quản lý bán hàng',
        children: [
            {
                title: 'Đơn hàng',
                to: '/orders'
            }
        ]
    },
    {
        label: 'Quản lý Files',
        children: [
            {
                title: 'Danh sách Files',
                to: '/file-manager'
            }
        ]
    },
    {
        label: 'Thiết Lập WEBSITE',
        children: [
            {
                title: 'Thiết lập hệ thống',
                to: `${ROUTER.SYSTEM_SETTINGS}`
            },
            {
                title: 'Thiết lập trang chủ',
                to: `${ROUTER.SYSTEM_SETTINGS_HOME_SLIDER}`
            },
            {
                title: 'Thiết lập secret key',
                to: `${ROUTER.SYSTEM_SETTINGS_SECRET_KEY_BUNNYCDN}`
            },
            {
                title: 'Thiết lập email',
                to: '/website-setup/email'
            },
            {
                title: 'Pages',
                to: '/website-setup/pages'
            }
        ]
    }
]
