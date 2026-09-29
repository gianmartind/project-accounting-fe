import { IconExpand, IconSearch } from "@arco-design/web-react/icon";
import type {
  GenericTableColumnConfig,
  ImplementedTableProps,
} from "../../../core/components/generic_table/generic-table.interface";
import type { FilterDropdownProps } from "../../../core/components/filters/interface/filter.interface";
import InputSearchFilter from "../../../core/components/filters/components/InputSearchFilter";
import GenericTable from "../../../core/components/generic_table/GenericTable";
import { Button, Space, Tag } from "@arco-design/web-react";
import type { StoreListRecord } from "../store.interface";
import { useMemo } from "react";
import SelectTagFilter from "../../../core/components/filters/components/SelectTagFilter";

type Props = ImplementedTableProps<StoreListRecord> & {
  tagOptions: string[];
};
const StoreTable = ({
  data,
  onTableChange,
  onDetailOpen,
  loading,
  tagOptions,
}: Props) => {
  const columns = useMemo<GenericTableColumnConfig<StoreListRecord>[]>(
    () => [
      {
        key: "name",
        title: "Nama",
        dataIndex: "name",
        width: 200,
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
        key: "address",
        title: "Alamat",
        dataIndex: "address",
        width: 400,
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
        key: "tags",
        title: "Tag(s)",
        dataIndex: "tags",
        width: 300,
        sorter: true,
        filterIcon: <IconSearch />,
        filterDropdown: ({
          setFilterKeys,
          filterKeys,
          confirm,
        }: FilterDropdownProps) => {
          return (
            <SelectTagFilter
              setFilterKeys={setFilterKeys}
              filterKeys={filterKeys}
              confirm={confirm}
              options={tagOptions || []}
            />
          );
        },
        render: (value: string[], record: StoreListRecord) => (
          <Space wrap>
            {value.map((tag) => (
              <Tag key={`${record.uuid}-${tag}`} bordered>
                {tag}
              </Tag>
            ))}
          </Space>
        ),
      },
      {
        key: "action",
        title: "",
        dataIndex: "action",
        width: 1,
        render: (
          _: unknown,
          record: StoreListRecord,
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
    ],
    [tagOptions],
  );
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

export default StoreTable;
