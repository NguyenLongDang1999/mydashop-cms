// ** Types Imports
import type { IAggregations, IPagination } from '~/types/core.type'

export interface ISliderForm {
    name: string
    url: string
    status?: number
    image_uri?: string
    description?: string
}

export interface ISliderSearch extends IPagination {
    name?: string
    status?: string
}

export interface ISlider {
    id: number
    name: string
    url: string
    image_uri: string
    status: number
    description: string
    created_at: string
    updated_at: string
}

export interface ISliderTable extends IAggregations {
    data: ISlider[]
}
