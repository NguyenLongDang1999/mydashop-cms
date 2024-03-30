export interface IPagination {
    page: number
    pageSize: number
}

export interface IAggregations {
    aggregations: number
}

export interface IOptions {
    id: number | string
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

export interface IDeleteRecord {
    id: string
}

export interface IDateRangePicker {
    start_date: string | Date
    end_date: string | Date
}
