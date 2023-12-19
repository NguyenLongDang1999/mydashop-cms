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

export const sliderColumns: Columns[] = [
    {
        key: 'name',
        label: 'Thông tin slider',
        class: minWithColumn(200)
    },
    status,
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
