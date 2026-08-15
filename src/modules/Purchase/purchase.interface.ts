import type { BaseListRecordRequest } from "../../core/base.interface";

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

export interface PurchaseListRecord {
  uuid: string;
  project_name: string;
  store_name: string;
  purchase_date: string;
  total_price: number;
}

export interface PurchaseListRecordRequest extends BaseListRecordRequest {
  store_name?: string;
  store_uuid?: string;
  project_name?: string;
  project_uuid?: string;
  purchase_date_from?: string;
  purchase_date_to?: string;
}

export interface AvailableFilterOptions {
  project_options: string[];
  store_options: string[];
}
