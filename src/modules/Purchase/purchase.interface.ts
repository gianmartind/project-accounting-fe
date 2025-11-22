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
  unit?: Unit;
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

export const UNIT = {
  PC: "BUAH",
  KG: "KILO",
  GRAM: "GRAM",
};
type Unit = (typeof UNIT)[keyof typeof UNIT];

export interface PurchaseListRecordRequest {
  store_name?: string;
  store_uuid?: string;
  project_name?: string;
  project_uuid?: string;
  purchase_date?: string;
  page: number;
  size: number;
}

export interface AvailableFilterOptions {
  project_options: string[];
  store_options: string[];
}
