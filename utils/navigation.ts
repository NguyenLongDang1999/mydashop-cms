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
                title: 'Thuộc tính (Giá trị)',
                to: `${ROUTER.PRODUCT_ATTRIBUTE_VALUES}`
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
                title: 'Thiết lập trang chủ',
                to: '/website-setup'
            },
            {
                title: 'Thiết lập hệ thống',
                to: '/website-setup/system'
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
