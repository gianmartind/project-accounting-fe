export type BaseFilterProps = {
  filterKeys?: string[];
  setFilterKeys?: (keys: string[]) => void;
  confirm?: () => void;
};