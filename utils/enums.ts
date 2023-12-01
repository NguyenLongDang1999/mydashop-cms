export enum STATUS {
    ACTIVE = 10,
    INACTIVE = 20
}

export enum POPULAR {
    ACTIVE = 10,
    INACTIVE = 20
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
    FLASH_SALE = 'flash-sale',
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
    FLASH_SALE = '/flash-sale',
}

export enum IMAGE {
    DEFAULT = '/default.jpg'
}

export enum FORMAT {
    DATE_TIME = 'DD-MM-YYYY HH:mm'
}
