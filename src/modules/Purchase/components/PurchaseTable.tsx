import { Button, Table, type PaginationProps } from "@arco-design/web-react";
import {
  IconCalendar,
  IconExpand,
  IconFilter,
  IconSearch,
} from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import type {
  PurchaseListRecord,
  PurchaseListRecordResponse,
} from "../purchase.interface";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import InputSearchFilter from "../../../core/components/filters/components/InputSearchFilter";
import type { FilterDropdownProps } from "../../../core/components/filters/interface/filter.interface";
import DateRangeFilter from "../../../core/components/filters/components/DateRangeFilter";
import NumberRangeFilter from "../../../core/components/filters/components/NumberRangeFilter";
import { rupiahFormat } from "../../../core/utils";

type Props = {
  data: PurchaseListRecordResponse;
  onTableChange: (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseListRecord, string[]>>
  ) => void;
  onPuchaseDetailOpen: (uuid: string) => void;
};

const PurchaseTable = ({ data, onTableChange, onPuchaseDetailOpen }: Props) => {
  const columns = [
    {
      key: "purchase_date",
      title: "Purchase Date",
      dataIndex: "purchase_date",
      sorter: true,
      filterIcon: <IconCalendar />,
      filterDropdown: ({
        setFilterKeys,
        filterKeys,
        confirm,
      }: FilterDropdownProps) => {
        return (
          <DateRangeFilter
            setFilterKeys={setFilterKeys}
            filterKeys={filterKeys}
            confirm={confirm}
          />
        );
      },
    },
    {
      key: "project_name",
      title: "Project Name",
      dataIndex: "project_name",
      sorter: true,
      filterIcon: <IconSearch />,
      filterDropdown: ({
        setFilterKeys,
        filterKeys,
        confirm,
      }: FilterDropdownProps) => {
        return (
          <InputSearchFilter
            setFilterKeys={setFilterKeys}
            filterKeys={filterKeys}
            confirm={confirm}
          />
        );
      },
    },
    {
      key: "store_name",
      title: "Store Name",
      dataIndex: "store_name",
      sorter: true,
      filterIcon: <IconSearch />,
      filterDropdown: ({
        setFilterKeys,
        filterKeys,
        confirm,
      }: FilterDropdownProps) => {
        return (
          <InputSearchFilter
            setFilterKeys={setFilterKeys}
            filterKeys={filterKeys}
            confirm={confirm}
          />
        );
      },
    },
    {
      key: "total_price",
      title: "Total Price",
      dataIndex: "total_price",
      render: (_: unknown, record: PurchaseListRecord) => {
        return `Rp ${rupiahFormat(record.total_price)}`;
      },
      filterIcon: <IconFilter />,
      filterDropdown: ({
        setFilterKeys,
        filterKeys,
        confirm,
      }: FilterDropdownProps) => {
        return (
          <NumberRangeFilter
            setFilterKeys={setFilterKeys}
            filterKeys={filterKeys}
            confirm={confirm}
          />
        );
      },
    },
    {
      key: "action",
      title: "",
      dataIndex: "action",
      width: 1,
      render: (_: unknown, record: PurchaseListRecord) => {
        return (
          <Button
            type="text"
            icon={<IconExpand />}
            onClick={() => onPuchaseDetailOpen(record.uuid)}
          >
            Detail
          </Button>
        );
      },
    },
  ];

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

  const handleTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseListRecord, string[]>>
  ) => {
    onTableChange(pagination, sorter, filters);
  };

  return (
    <Table
      rowKey="uuid"
      columns={columns}
      onChange={handleTableChange}
      pagination={pagination}
      data={data.content}
    />
  );
};

export default PurchaseTable;
