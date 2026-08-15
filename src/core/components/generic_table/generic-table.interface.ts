import type { PaginationProps } from "@arco-design/web-react";
import type { BaseListRecordResponse } from "../../base.interface";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import type { FilterDropdownProps } from "../filters/interface/filter.interface";

export interface ImplementedTableProps<T> {
  data: BaseListRecordResponse<T>;
  onTableChange: (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof T, string[]>>,
  ) => void;
  onDetailOpen?: (uuid: string) => void;
  loading?: boolean;
}

export interface GenericTableProps<T> extends ImplementedTableProps<T> {
  columns: GenericTableColumnConfig<T>[];
}

export interface GenericTableColumnConfig<T> {
  key: string | number | undefined;
  title: string;
  dataIndex?: string | undefined;
  sorter?: boolean;
  filterIcon?: React.ReactNode;
  filterDropdown?: (props: FilterDropdownProps) => React.ReactNode;
  render?: (
    value: any,
    record: T,
    index: number,
    onDetailOpen?: (uuid: string) => void,
  ) => React.ReactNode;
  width?: number;
}
