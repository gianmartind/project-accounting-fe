import type { BaseListRecordRequest } from "../../core/base.interface";

export interface ProjectListRecord {
  uuid: string;
  name: string;
  owner: string;
  city: string;
  start_date: string;
  end_date: string;
}

export interface ProjectDetail extends ProjectListRecord {
  address: string;
  notes: string;
}

export interface ProjectListRecordRequest extends BaseListRecordRequest {
  name?: string;
  owner?: string;
  city?: string;
  start_date_from?: string;
  start_date_to?: string;
  end_date_from?: string;
  end_date_to?: string;
  status?: "COMPLETED" | "ONGOING";
}

export interface ProjectListRecordFilter {
  name?: string;
  owner?: string;
  city?: string;
  start_date?: [string, string];
  end_date?: [string, string];
  status?: "COMPLETED" | "ONGOING";
}
