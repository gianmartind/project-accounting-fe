export interface ProjectSimple {
  uuid: string;
  name: string;
  start_date: string;
  end_date: string;
}

export interface ProjectSimpleResponse {
  content: ProjectSimple[];
  total_elements: number;
  total_pages: number;
  size: number;
  number: number;
}

export interface ProjectDetail extends ProjectSimple {
  address: string;
  notes: string;
}

export interface ProjectListRecordRequest {
  name?: string;
  start_date_from?: string;
  start_date_to?: string;
  end_date_from?: string;
  end_date_to?: string;
  status?: "COMPLETED" | "ONGOING";
  page: number;
  size: number;
  sort?: string;
}

export interface ProjectListRecordFilter {
  name?: string;
  start_date?: [string, string];
  end_date?: [string, string];
  status?: "COMPLETED" | "ONGOING";
}
