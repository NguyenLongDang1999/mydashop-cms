export interface IPagination {
    page: number
    pageSize: number
}

export interface IAggregations {
    aggregations: number
}

export interface IOptions {
    id: number
    name: string
    color?: string
}

export interface IRow<T> {
    row: T
}

export interface ISearchDropdown {
    id: number
    label: string
    avatar: {
        src: string
    }
}
