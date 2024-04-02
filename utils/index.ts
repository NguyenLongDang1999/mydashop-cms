// ** Types Imports
import type { IOptions } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

export const valueTransform = (dataList: IOptions[], value: string) => dataList.find(val => val.id === value)

export const formatDateTime = (date: string) => useDateFormat(date, FORMAT.DATE_TIME).value

export const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

export const compareDateTime = (row: IProduct) => {
    const startDate = new Date(row.discount_start_date).getTime()
    const endDate = new Date(row.discount_end_date).getTime()
    const today = new Date().getTime()

    return today >= startDate && today <= endDate
}

export const formatSellingPrice = (row: IProduct | unknown) => {
    let discount = 0
    let sellingPrice = 0

    const productRow = row as IProduct

    const formatPrice = Number(productRow.price)
    const formatSpecialPrice = Number(productRow.special_price)

    if (String(productRow.special_price_type) === SPECIAL_PRICE.PERCENT) {
        discount = (formatPrice / 100) * formatSpecialPrice
        sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
    }

    if (String(productRow.special_price_type) === SPECIAL_PRICE.PRICE) {
        discount = formatSpecialPrice
        sellingPrice = formatPrice - discount
    }

    // ** Sale Price
    if (compareDateTime(productRow)) {
        const formatDiscountAmount = Number(productRow.discount_amount)

        if (productRow.discount_type === SPECIAL_PRICE.PERCENT) {
            discount = (formatPrice / 100) * formatDiscountAmount
            sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
        }

        if (productRow.discount_type === SPECIAL_PRICE.PRICE) {
            discount = formatDiscountAmount
            sellingPrice = formatPrice - discount
        }
    }

    return formatCurrency(sellingPrice)
}

export const formatPathFile = (originalPath: string, ObjectName: string) => originalPath.replace(/^\/images-data/, '') + ObjectName

export const getPathImageFile = (name?: string) => {
    if (name) {
        return name.includes('https://') ?
            name :
            PATH.BUNNY_CDN_URL + name
    }

    return IMAGE.DEFAULT
}

export const goToPage = (pageName?: number | string, path?: string) => {
    const route = useRoute()

    if (pageName) {
        return `${path || route.path}/${pageName}`
    }

    return `${path || route.path}`
}

export const calculateCartDiscount = (cartTotal: number, amount: number, isFormat = true) => {
    let discount = amount
    let sellingPrice = cartTotal - discount

    if (amount > 0 && amount <= 100) {
        discount = ((cartTotal / 100) * amount)
        sellingPrice = Math.round((cartTotal - discount) / 1000) * 1000
    }

    return isFormat ? formatCurrency(sellingPrice) : sellingPrice
}
