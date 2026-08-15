import {
  IconCalendar,
  IconSearch,
  IconExpand,
} from "@arco-design/web-react/icon";
import DateRangeFilter from "../../../core/components/filters/components/DateRangeFilter";
import InputSearchFilter from "../../../core/components/filters/components/InputSearchFilter";
import type { FilterDropdownProps } from "../../../core/components/filters/interface/filter.interface";
import type { GenericTableColumnConfig, ImplementedTableProps } from "../../../core/components/generic_table/generic-table.interface";
import { rupiahFormat } from "../../../core/utils";
import type { PurchaseListRecord } from "../purchase.interface";
import { Button } from "@arco-design/web-react";
import GenericTable from "../../../core/components/generic_table/GenericTable";
const PurchaseTable = ({ onDetailOpen, data, onTableChange, loading }: ImplementedTableProps<PurchaseListRecord>) => {
  const columns: GenericTableColumnConfig<PurchaseListRecord>[] = [
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
      sorter: true,
      // filterIcon: <IconFilter />,
      // filterDropdown: ({
      //   setFilterKeys,
      //   filterKeys,
      //   confirm,
      // }: FilterDropdownProps) => {
      //   return (
      //     <NumberRangeFilter
      //       setFilterKeys={setFilterKeys}
      //       filterKeys={filterKeys}
      //       confirm={confirm}
      //     />
      //   );
      // },
    },
    {
      key: "action",
      title: "",
      dataIndex: "action",
      width: 1,
      render: (
        _: unknown,
        record: PurchaseListRecord,
        __: number,
        onDetailOpen,
      ) => {
        return (
          <Button
            type="text"
            icon={<IconExpand />}
            onClick={() => onDetailOpen && onDetailOpen(record.uuid)}
          >
            Detail
          </Button>
        );
      },
    },
  ];

  return (
    <GenericTable
      data={data}
      columns={columns}
      onTableChange={onTableChange}
      onDetailOpen={onDetailOpen}
      loading={loading}
    />
  );
};

export default PurchaseTable;
