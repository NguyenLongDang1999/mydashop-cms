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
                to: '/category'
            },
            {
                title: 'Thương hiệu',
                to: '/brand'
            },
            {
                title: 'Thuộc tính',
                to: '/attribute'
            },
            {
                title: 'Thuộc tính (Giá trị)',
                to: '/attribute-values'
            },
            {
                title: 'Chiến dịch',
                to: '/flash-deals'
            },
            {
                title: 'Coupons',
                to: '/coupons'
            },
            {
                title: 'Sản phẩm',
                to: '/product'
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
                title: 'Pages',
                to: '/website-setup/pages'
            }
        ]
    }
]
