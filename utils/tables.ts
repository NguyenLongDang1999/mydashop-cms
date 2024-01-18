// ** Interface
interface Columns {
    [key: string]: unknown;
    key: string;
    sortable?: boolean | undefined;
    direction?: 'desc' | 'asc' | undefined;
    class?: string | undefined;
}

const minWithColumn = (w: number) => `min-w-[${w}px]`

// ** Data
const status: Columns = {
    key: 'status',
    label: 'Trạng thái'
}

const popular: Columns = {
    key: 'popular',
    label: 'Phổ biến'
}

const actions: Columns = {
    key: 'actions',
    label: 'Thao tác',
    class: minWithColumn(100)
}

export const productColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin sản phẩm',
        class: minWithColumn(250)
    },
    {
        key: 'price',
        label: 'Giá tiền',
        class: minWithColumn(250)
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        class: minWithColumn(160)
    },
    status,
    popular,
    actions
]

export const productNoActionColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin sản phẩm',
        class: minWithColumn(250)
    },
    {
        key: 'price',
        label: 'Giá tiền',
        class: minWithColumn(250)
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        class: minWithColumn(160)
    },
    status,
    popular
]

export const attributeColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin thuộc tính',
        class: minWithColumn(180)
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        class: minWithColumn(250)
    },
    status,
    actions
]

export const brandColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin thương hiệu',
        class: minWithColumn(180)
    },
    {
        key: 'category_id',
        label: 'Danh mục',
        class: minWithColumn(250)
    },
    status,
    popular,
    actions
]

export const categoryColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin danh mục',
        class: minWithColumn(200)
    },
    {
        key: 'parent_id',
        label: 'Danh mục cha',
        class: minWithColumn(200)
    },
    status,
    popular,
    {
        key: 'created_at',
        label: 'Ngày tạo',
        class: minWithColumn(120)
    },
    actions
]

export const flashDealsColumns: Columns[] = [
    {
        key: 'name',
        label: 'Tên chiến dịch',
        class: minWithColumn(200)
    },
    {
        key: 'date_range',
        label: 'Ngày áp dụng',
        class: minWithColumn(250)
    },
    status,
    popular,
    actions
]

export const couponsColumns: Columns[] = [
    {
        key: 'code',
        label: 'Code',
        class: minWithColumn(160)
    },
    {
        key: 'min_buy',
        label: 'Đơn hàng tối thiểu',
        class: minWithColumn(160)
    },
    {
        key: 'discount',
        label: 'Số tiền giảm',
        class: minWithColumn(160)
    },
    {
        key: 'date_range',
        label: 'Ngày áp dụng',
        class: minWithColumn(250)
    },
    actions
]

export const fileColumns: Columns[] = [
    {
        key: 'name',
        label: 'Tiêu đề',
        class: minWithColumn(350)
    },
    {
        key: 'size',
        label: 'Kích thước',
        class: minWithColumn(160)
    },
    {
        key: 'date_modified',
        label: 'Ngày chỉnh sửa',
        class: minWithColumn(250)
    },
    actions
]

export const pagesColumns: Columns[] = [
    {
        key: 'name',
        label: 'Tiêu đề',
        class: minWithColumn(250)
    },
    {
        key: 'slug',
        label: 'Đường dẫn URL',
        class: minWithColumn(250)
    },
    status,
    actions
]

export const ordersColumns: Columns[] = [
    {
        key: 'name',
        label: 'Mã đơn hàng',
        class: minWithColumn(250)
    },
    {
        key: 'users',
        label: 'Thông tin khách hàng',
        class: minWithColumn(250)
    },
    {
        key: 'grand_total',
        label: 'Thông tin giá cả',
        class: minWithColumn(250)
    },
    status,
    actions
]
