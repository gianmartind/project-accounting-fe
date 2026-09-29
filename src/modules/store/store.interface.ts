import type { BaseListRecordRequest } from "../../core/base.interface";

export interface StoreListRecord {
  uuid: string;
  name: string;
  address: string;
  tags: string[];
}

export interface StoreDetail extends StoreListRecord {
  notes: string;
}

export interface StoreListRecordRequest extends BaseListRecordRequest{
  name?: string;
  address?: string;
  tagList?: string;
}
