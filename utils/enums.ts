export enum STATUS {
    ACTIVE = 1,
    INACTIVE = 2
}

export enum POPULAR {
    ACTIVE = 1,
    INACTIVE = 2
}

export enum PAGE {
    CURRENT = 1,
    SIZE = 10
}

export enum DISCOUNT {
    PRICE = 1,
    PERCENT = 2
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
}

export enum ROUTER {
    DASHBOARD = '/',
    LOGIN = '/auth/login',
    CATEGORY = '/category',
    BRAND = '/brand',
    ATTRIBUTE = '/attribute',
    PRODUCT = '/product',
}

export enum IMAGE {
    DEFAULT = '/assets/default.jpg'
}

export enum FORMAT {
    DATE_TIME = 'DD-MM-YYYY HH:mm'
}
