// ** Types Imports
import type { IOptions } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

export const valueTransform = (dataList: IOptions[], value: number) => dataList.find(val => val.id === value)

export const formatDateTime = (date: string) => useDateFormat(date, FORMAT.DATE_TIME).value

export const formatCurrency = (amount: number) => amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
})

export const getImageFile = (path: string, name?: string) => {
    if (name) {
        return name.includes('https://') ?
            name :
            `${config.previewCDN}/${path}/${name}`
    }

    return IMAGE.DEFAULT
}

export const compareDateTime = (row: IProduct) => {
    const startDate = new Date(row.discount_start_date).getTime()
    const endDate = new Date(row.discount_end_date).getTime()
    const today = new Date().getTime()

    return today >= startDate && today <= endDate
}

export const formatSellingPrice = (row: IProduct) => {
    let discount = 0
    let sellingPrice = 0

    const formatPrice = Number(row.price)
    const formatSpecialPrice = Number(row.special_price)

    if (row.special_price_type === SPECIAL_PRICE.PERCENT) {
        discount = (formatPrice / 100) * formatSpecialPrice
        sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
    }

    if (row.special_price_type === SPECIAL_PRICE.PRICE) {
        discount = formatSpecialPrice
        sellingPrice = formatPrice - discount
    }

    // ** Sale Price
    if (compareDateTime(row)) {
        const formatDiscountAmount = Number(row.discount_amount)

        if (row.discount_type === SPECIAL_PRICE.PERCENT) {
            discount = (formatPrice / 100) * formatDiscountAmount
            sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
        }

        if (row.discount_type === SPECIAL_PRICE.PRICE) {
            discount = formatDiscountAmount
            sellingPrice = formatPrice - discount
        }
    }

    return formatCurrency(sellingPrice)
}

export const objectToQueryString = (obj: Record<string, string | number | undefined | null | boolean>): string => {
    const cleanedObj: Record<string, string> = {}

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== undefined && obj[key] !== null) {
            cleanedObj[key] = String(obj[key])
        }
    }

    return Object.keys(cleanedObj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(cleanedObj[key])}`)
        .join('&')
}
