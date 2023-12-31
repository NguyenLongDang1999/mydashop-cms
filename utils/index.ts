// ** Types Imports
import type { IOptions } from '~/types/core.type'
import type { IProduct } from '~/types/product.type'

export const valueTransform = (dataList: IOptions[], value: number | string) => dataList.find(val => val.id === value)

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

export const formatPathFile = (originalPath: string, ObjectName: string) => originalPath.replace(/^\/images-data/, '') + ObjectName

export const getPathImageFile = (name?: string) => {
    const config = useRuntimeConfig()

    if (name) {
        return name.includes('https://') ?
            name :
            config.public.previewCdn + name
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
