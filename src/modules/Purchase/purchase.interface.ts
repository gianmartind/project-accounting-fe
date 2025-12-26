export interface PurchaseDetail {
  uuid: string;
  store_name: string;
  project_uuid: string;
  purchase_date: string;
  items: PurchaseItem[];
  notes: string;
}

export interface PurchaseItem {
  uuid?: string;
  name?: string;
  type?: string;
  amount?: number;
  unit?: string;
  brand?: string;
  category?: string;
  price?: number;
  purchase_uuid: string;
}

export interface PurchaseListRecordResponse {
  content: PurchaseListRecord[];
  total_elements: number;
  total_pages: number;
  size: number;
  number: number;
}

export interface PurchaseListRecord {
  uuid: string;
  project_name: string;
  store_name: string;
  purchase_date: string;
  total_price: number;
}

export interface PurchaseListRecordFilter {
  store_name?: string;
  project_name?: string;
  purchase_date?: string[];
}

export interface PurchaseListRecordRequest {
  store_name?: string;
  store_uuid?: string;
  project_name?: string;
  project_uuid?: string;
  purchase_date_from?: string;
  purchase_date_to?: string;
  page: number;
  size: number;
  sort?: string;
}

export interface AvailableFilterOptions {
  project_options: string[];
  store_options: string[];
}
