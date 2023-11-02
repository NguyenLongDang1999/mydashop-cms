// ** Types Imports
import type { IOptions } from '~/types/core.type'

export const optionStatus = [
    {
        id: STATUS.ACTIVE,
        name: 'Hoạt động',
        color: 'blue'
    },
    {
        id: STATUS.INACTIVE,
        name: 'Ngừng hoạt động',
        color: 'red'
    }
]

export const optionPopular = [
    {
        id: POPULAR.ACTIVE,
        name: 'Phổ biến',
        color: 'blue'
    },
    {
        id: POPULAR.INACTIVE,
        name: 'Không phổ biến',
        color: 'red'
    }
]

export const optionTypeDiscount = [
    {
        id: DISCOUNT.PRICE,
        name: 'Giá tiền'
    },
    {
        id: DISCOUNT.PERCENT,
        name: 'Phần trăm'
    }
]

export const valueTransform = (dataList: IOptions[], value: number) => dataList.find(val => val.id === value)
export const getImageFile = (path: string, name?: string) => {
    if (name) {
        return name.includes('https://') ?
            name :
            `${config.previewCDN}/${path}/${name}`
    }

    return IMAGE.DEFAULT
}
