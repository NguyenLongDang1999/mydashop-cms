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
