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
