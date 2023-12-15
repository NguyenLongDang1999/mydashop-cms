export enum STATUS {
    ACTIVE = 10,
    INACTIVE = 20
}

export enum POPULAR {
    ACTIVE = 10,
    INACTIVE = 20
}

export enum SHOW_PRODUCT {
    SHOW = 10,
    NOT_SHOW = 20,
}

export enum PAGE {
    CURRENT = 1,
    SIZE = 10
}

export enum INVENTORY_STATUS {
    STOCK = 10,
    OUT_OF_STOCK = 20
}

export enum SPECIAL_PRICE {
    PRICE = 10,
    PERCENT = 20
}

export enum PRODUCT_TYPE {
    SINGLE = 10,
    VARIANT = 20
}

export enum AUTH {
    TOKEN = 'accessToken',
    USER_DATA = 'userData',
}

export enum ROUTE {
    AUTHENTICATION = 'auth',
    CATEGORY = 'category',
    BRAND = 'brand',
    SLIDER = 'slider',
    ATTRIBUTE = 'attribute',
    PRODUCT = 'product',
    FLASH_DEALS = 'flash-deals',
    COUPONS = 'coupons',
}

export enum ROUTER {
    DASHBOARD = '/',
    LOGIN = '/auth/login',
    CATEGORY = '/category',
    BRAND = '/brand',
    ATTRIBUTE = '/attribute',
    PRODUCT = '/product',
    COUPONS = '/coupons',
    FLASH_DEALS = '/flash-deals',
}

export enum IMAGE {
    DEFAULT = '/default.jpg'
}

export enum FORMAT {
    DATE_TIME = 'DD-MM-YYYY HH:mm'
}

export enum MESSAGE {
    SUCCESS = 'Dữ liệu đã được lưu thành công!',
    ERROR = 'Đã xảy ra lỗi trong quá trình xử lý!',
    DELETE = 'Xóa dữ liệu thành công!'
}
