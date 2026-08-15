import { type PaginationProps, Table } from "@arco-design/web-react";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import { useState, useEffect } from "react";
import type { GenericTableProps } from "./generic-table.interface";

const GenericTable = <T,>({
  data,
  columns,
  onTableChange,
  onDetailOpen,
  loading
}: GenericTableProps<T>) => {
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });

  useEffect(() => {
    setPagination({
      sizeCanChange: true,
      showTotal: true,
      total: data.total_elements,
      pageSize: data.size,
      current: data.number + 1,
      pageSizeChangeResetCurrent: true,
    });
  }, [data]);

  const enhancedColumns = columns.map(column => ({
    ...column,
    render: column.render 
      ? (value: any, record: T, index: number) => 
          column.render!(value, record, index, onDetailOpen)
      : undefined
  }));

  const handleTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof T, string[]>>
  ) => {
    onTableChange(pagination, sorter, filters);
  };

  return (
    <Table
      columns={enhancedColumns}
      onChange={handleTableChange}
      pagination={pagination}
      data={data.content}
      loading={loading}
    />
  );
};

export default GenericTable;