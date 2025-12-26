export type BaseFilterProps = {
  filterKeys?: string[];
  setFilterKeys?: (keys: string[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  confirm?: Function | (() => void);
};

export interface FilterDropdownProps {
  filterKeys?: string[];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setFilterKeys?: (filterKeys: string[], callback?: Function | (() => void)) => void;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  confirm?: Function | (() => void);
}