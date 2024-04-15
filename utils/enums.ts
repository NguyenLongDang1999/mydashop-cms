export enum STATUS {
    ACTIVE = '10',
    INACTIVE = '20'
}

export enum PAGE {
    CURRENT = 1,
    SIZE = 10
}

export enum MANAGE_STOCK {
    YES = '10',
    NO = '20'
}

export enum SPECIAL_PRICE {
    PRICE = '10',
    PERCENT = '20'
}

export enum PRODUCT_TYPE {
    SINGLE = '10',
    VARIANT = '20'
}

export enum INPUT_TYPE {
    TEXT = '10',
    TEXTAREA = '20',
    SELECT = '30',
    UPLOAD = '40'
}

export enum RELATIONS_TYPE {
    UPSELL = 10,
    CROSS_SELL = 20,
    RELATED = 30
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
    PRODUCT_CATEGORY = 'product-categories',
    PRODUCT_BRAND = 'product-brands',
    PRODUCT_ATTRIBUTE = 'product-attributes',
    PRODUCT_FLASH_DEALS = 'product-flash-deals',
    PRODUCT = 'product',
    FILE_MANAGER = 'file-manager',
    PRODUCT_COLLECTION = 'product-collections',
    SYSTEM_SETTINGS = 'system-settings',

    FLASH_DEALS = 'flash-deals',
    COUPONS = 'coupons',
    WEBSITE_SETUP = 'website-setup',
    PAGES = 'pages',
    ORDERS = 'orders',
}

export enum ROUTER {
    DASHBOARD = '/',
    LOGIN = '/auth/login',
    COUPONS = '/coupons',
    FLASH_DEALS = '/flash-deals',
    WEBSITE_SETUP = '/website-setup',

    // ** PRODUCT
    PRODUCT_ATTRIBUTE = '/product-attribute',
    PRODUCT_BRAND = '/product-brand',
    PRODUCT_CATEGORY = '/product-category',
    PRODUCT_COLLECTION = '/product-collection',
    PRODUCT_FLASH_DEALS = '/product-flash-deals',
    PRODUCT = '/product',

    SYSTEM_SETTINGS = '/system-settings',
    SYSTEM_SETTINGS_HOME = '/system-settings/home',

    // ** SYSTEM SETTING SECRET KEY
    SYSTEM_SETTINGS_SECRET_KEY_BUNNYCDN = '/system-settings/secret-key/bunnycdn',
    SYSTEM_SETTINGS_SECRET_KEY_GOOGLE = '/system-settings/secret-key/google',
    SYSTEM_SETTINGS_SECRET_KEY_FACEBOOK = '/system-settings/secret-key/facebook',

    // ** SYSTEM SETTING HOME
    SYSTEM_SETTINGS_HOME_SLIDER = '/system-settings/home/slider',
    SYSTEM_SETTINGS_HOME_PRODUCT_FLASH_DEALS = '/system-settings/home/product-flash-deals',
    SYSTEM_SETTINGS_HOME_PRODUCT_CATEGORY = '/system-settings/home/product-category',
    SYSTEM_SETTINGS_HOME_PRODUCT_COLLECTION = '/system-settings/home/product-collection'
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
