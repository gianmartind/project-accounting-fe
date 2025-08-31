export interface ProjectSimple {
  uuid: string;
  name: string;
  start_date: string;
  end_date: string;
}

export interface ProjectDetail extends ProjectSimple {
  address: string;
  notes: string;
}
