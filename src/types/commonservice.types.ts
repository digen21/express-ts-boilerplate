export interface QueryOptions<T> {
  projection?: Partial<Record<keyof T, 0 | 1>>;
  populate?: string | object | (string | object)[];
  sort?: Record<string, 1 | -1>;
  limit?: number;
  skip?: number;
}
