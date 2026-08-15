import type { BaseListRecordRequest } from "../../core/base.interface";

export interface PurchaseItemListRecord {
  name: string;
  type: string;
  brand: string;
  category: string;
  amount: number;
  unit: string;
  price: number;
  total_price: number;
  purchase_uuid: string;
  purchase_date: string;
  project_name: string;
  project_uuid: string;
  store_name: string;
  store_uuid: string;
}

export interface PurchaseItemListRecordFilter {
  name?: string;
  type?: string;
  brand?: string;
  category?: string;
  unit?: string;
  amount?: number[];
  price?: number[];
  total_price?: number[];
  store_name?: string;
  project_name?: string;
  purchase_date?: string[];
}

export interface PurchaseItemListRecordRequest extends BaseListRecordRequest {
  name?: string;
  type?: string;
  brand?: string;
  category?: string;
  unit?: string;
  store_name?: string;
  store_uuid?: string;
  project_name?: string;
  project_uuid?: string;
  purchase_date_from?: string;
  purchase_date_to?: string;
  amount_min?: number;
  amount_max?: number;
  price_min?: number;
  price_max?: number;
  total_price_min?: number;
  total_price_max?: number;
}

export interface PurchaseItemSummary {
  total_price: number;
  first_purchase_date: string;
  last_purchase_date: string;
}
