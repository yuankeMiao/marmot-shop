

export interface QueryResponse<T> {
    data: Array<T>;
    totalCount: number;
  }

export interface BaseDto {
    id: string;
    createdDate: Date;
    updatedDate: Date;
}

export interface BaseQueryOptionType {
  sortOrder?: "Asc" | "Desc";
  offset?: number;
  limit? : number;
}