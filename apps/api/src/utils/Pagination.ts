export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginationResult<T> {
  data: T[]
  total: number
  page: number
  totalPages: number
  limit: number
}

export class Paginator {
  static getPagination({ page = 1, limit = 10 }: PaginationParams) {
    const take = Math.max(limit, 1)
    const skip = (Math.max(page, 1) - 1) * take

    return { take, skip }
  }

  static buildResult<T>(
    total: number,
    page: number,
    limit: number,
    data: T[]
  ): PaginationResult<T> {
    const totalPages = Math.ceil(total / limit)
    return {
      total,
      page,
      totalPages,
      limit,
      data
    }
  }
}
