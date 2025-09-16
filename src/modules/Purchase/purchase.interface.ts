export interface PurchaseDetail {
  uuid: string;
  store_name: string;
  date: string;
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

export const UNIT = {
  PC: "BUAH",
  KG: "KILO",
  GRAM: "GRAM",
};
type Unit = (typeof UNIT)[keyof typeof UNIT];
