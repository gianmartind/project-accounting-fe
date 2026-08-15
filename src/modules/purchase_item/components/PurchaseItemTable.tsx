import { Button, Card, Checkbox, Divider } from "@arco-design/web-react";
import {
  IconBook,
  IconCalendar,
  IconFilter,
  IconSearch,
} from "@arco-design/web-react/icon";
import { useMemo, useRef } from "react";
import type { PurchaseItemListRecord } from "../purchase-item.interface";
import InputSearchFilter from "../../../core/components/filters/components/InputSearchFilter";
import type { FilterDropdownProps } from "../../../core/components/filters/interface/filter.interface";
import DateRangeFilter from "../../../core/components/filters/components/DateRangeFilter";
import NumberRangeFilter from "../../../core/components/filters/components/NumberRangeFilter";
import { rupiahFormat } from "../../../core/utils";
import type {
  GenericTableColumnConfig,
  ImplementedTableProps,
} from "../../../core/components/generic_table/generic-table.interface";
import GenericTable from "../../../core/components/generic_table/GenericTable";

const PurchaseItemTable = ({
  data,
  onTableChange,
  onDetailOpen,
  loading,
}: ImplementedTableProps<PurchaseItemListRecord>) => {
  const columnData = useRef([
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
  ]);
  const actionColumn = useRef<GenericTableColumnConfig<PurchaseItemListRecord>>({
    key: "action",
    title: "",
    dataIndex: "action",
    width: 1,
    render: (_: unknown, record: PurchaseItemListRecord, __, onDetailOpen) => {
      return (
        <Button
          type="text"
          icon={<IconBook />}
          onClick={() => onDetailOpen && onDetailOpen(record.purchase_uuid)}
        ></Button>
      );
    },
  });

  // Show/Hide Columns
  const columnOptions = useRef([
    { label: "Tanggal", value: "purchase_date" },
    { label: "Proyek", value: "project_name" },
    { label: "Toko", value: "store_name" },
    { label: "Nama", value: "name" },
    { label: "Jenis", value: "type" },
    { label: "Merek", value: "brand" },
    { label: "Kategori", value: "category" },
    { label: "Jumlah", value: "amount" },
    { label: "Satuan", value: "unit" },
    { label: "Harga", value: "price" },
    { label: "Harga Total", value: "total_price" },
  ]);

  const columnOptionValues = useMemo(() => {
    return columnOptions.current.map((option) => option.value);
  }, [columnOptions]);

  const {
    selected,
    selectAll,
    setSelected,
    unSelectAll,
    isAllSelected,
    isPartialSelected,
  } = Checkbox.useCheckbox(columnOptionValues, columnOptionValues);

  const tableColumns = useMemo<
    GenericTableColumnConfig<PurchaseItemListRecord>[]
  >(() => {
    const selectedColumns = columnData.current.filter((col) =>
      selected.includes(col.key),
    );
    if (!selectedColumns.length) return [];
    return [...selectedColumns, actionColumn.current];
  }, [selected]);
  return (
    <div>
      <Card size="small" style={{ width: "100%" }}>
        <Checkbox
          onChange={(checked) => {
            if (checked) {
              selectAll();
            } else {
              unSelectAll();
            }
          }}
          checked={isAllSelected()}
          indeterminate={isPartialSelected()}
        >
          Show all
        </Checkbox>
        <Divider type="vertical" />
        <Checkbox.Group
          value={selected}
          options={columnOptions.current}
          onChange={setSelected}
        />
      </Card>
      <GenericTable
        data={data}
        columns={tableColumns}
        onTableChange={onTableChange}
        onDetailOpen={onDetailOpen}
        loading={loading}
      />
    </div>
  );
};

export default PurchaseItemTable;
