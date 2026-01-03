import { Button, Table, type PaginationProps } from "@arco-design/web-react";
import {
  IconBook,
  IconCalendar,
  IconFilter,
  IconSearch,
} from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import type {
  PurchaseItemListRecord,
  PurchaseItemListRecordFilter,
  PurchaseItemListRecordResponse,
} from "../purchase-item.interface";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import InputSearchFilter from "../../../core/components/filters/components/InputSearchFilter";
import type { FilterDropdownProps } from "../../../core/components/filters/interface/filter.interface";
import DateRangeFilter from "../../../core/components/filters/components/DateRangeFilter";
import NumberRangeFilter from "../../../core/components/filters/components/NumberRangeFilter";
import { rupiahFormat } from "../../../core/utils";

type Props = {
  data: PurchaseItemListRecordResponse;
  onTableChange: (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseItemListRecordFilter, string[]>>
  ) => void;
  onOpenPurchase: (name: string) => void;
  loading?: boolean;
};

const PurchaseItemTable = ({ data, onTableChange, onOpenPurchase, loading }: Props) => {
  const columns = [
    {
      key: "purchase_date",
      title: "Tanggal",
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
      title: "Proyek",
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
      title: "Toko",
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
      key: "name",
      title: "Nama",
      dataIndex: "name",
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
      key: "type",
      title: "Jenis",
      dataIndex: "type",
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
      key: "brand",
      title: "Merk",
      dataIndex: "brand",
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
      key: "category",
      title: "Kategori",
      dataIndex: "category",
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
      key: "amount",
      title: "Jumlah",
      dataIndex: "amount",
      sorter: true,
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
      key: "unit",
      title: "Unit",
      dataIndex: "unit",
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
      key: "price",
      title: "Harga",
      dataIndex: "price",
      sorter: true,
      render: (_: unknown, record: PurchaseItemListRecord) => {
        return `Rp ${rupiahFormat(record.price)}`;
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
      key: "total_price",
      title: "Harga Total",
      dataIndex: "total_price",
      render: (_: unknown, record: PurchaseItemListRecord) => {
        return `Rp ${rupiahFormat(record.total_price)}`;
      },
      sorter: true,
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
      render: (_: unknown, record: PurchaseItemListRecord) => {
        return (
          <Button
            type="text"
            icon={<IconBook />}
            onClick={() => onOpenPurchase(record.purchase_uuid)}
          ></Button>
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
    filters: Partial<Record<keyof PurchaseItemListRecord, string[]>>
  ) => {
    onTableChange(pagination, sorter, filters);
  };

  return (
    <Table
      rowKey="name"
      columns={columns}
      onChange={handleTableChange}
      pagination={pagination}
      data={data.content}
      loading={loading}
    />
  );
};

export default PurchaseItemTable;
