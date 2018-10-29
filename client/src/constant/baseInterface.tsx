export interface IResponse {
    code: number,
    data: object | any[] | null,
    msg: string
}

export interface IQueryList {
    page: number,
    pageSize: number
}