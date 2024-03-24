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

export enum PRODUCT_TYPE {
    SINGLE = 10,
    VARIANT = 20
}

export enum ORDER_STATUS {
    NEW = 10,
    CONFIRMED = 20,
    ON_THE_WAY = 30,
    DELIVERED = 40,
    CANCEL = 50,
}

export enum AUTH {
    TOKEN = 'accessTokenAdmin',
    USER_DATA = 'adminData',
}

export enum ROUTE {
    AUTHENTICATION = 'auth',
    CATEGORY = 'category',
    BRAND = 'brand',
    ATTRIBUTE = 'attribute',
    ATTRIBUTE_VALUES = 'attribute-values',
    PRODUCT = 'product',
    FLASH_DEALS = 'flash-deals',
    COUPONS = 'coupons',
    WEBSITE_SETUP = 'website-setup',
    PAGES = 'pages',
    ORDERS = 'orders',
    FILE_MANAGER = 'file-manager',
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
    WEBSITE_SETUP = '/website-setup',
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

export enum WEBSITE_SETUP {
    HOME_SLIDER = 'home_slider',
    HOME_BANNER1 = 'home_banner1',
    HOME_BANNER2 = 'home_banner2',
    HOME_BANNER3 = 'home_banner3',
    WEBSITE_COLOUR = 'website_colour',
    HOME_CATEGORIES = 'home_categories',
    TOP_BRANDS = 'top_brands',
}

export enum MESSAGE_ERROR {
    CONFLICT = 'conflict'
}

export enum PATH {
    BUNNY_CDN_URL = 'https://nuxivy.b-cdn.net/'
}
