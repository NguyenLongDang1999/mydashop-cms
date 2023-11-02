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
