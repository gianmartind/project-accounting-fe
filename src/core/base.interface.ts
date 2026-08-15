export interface BaseListRecordRequest {
  page: number;
  size: number;
  sort?: string;
}

export interface BaseListRecordResponse<T> {
  content: T[];
  total_elements: number;
  total_pages: number;
  size: number;
  number: number;
}
