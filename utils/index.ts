// ** Types Imports
import type { IOptions } from '~/types/core.type'

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

export const formatSellingPrice = (price?: string, special_price?: string, special_price_type: number) => {
    let discount = 0
    let sellingPrice = 0

    const formatPrice = Number(price)
    const formatSpecialPrice = Number(special_price)

    if (special_price_type === SPECIAL_PRICE.PERCENT) {
        discount = (formatPrice / 100) * formatSpecialPrice
        sellingPrice = Math.round((formatPrice - discount) / 1000) * 1000
    }

    if (special_price_type === SPECIAL_PRICE.PRICE) {
        discount = formatSpecialPrice
        sellingPrice = formatPrice - discount
    }

    return sellingPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    })
}
