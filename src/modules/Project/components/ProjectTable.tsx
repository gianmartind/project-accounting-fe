import {
  IconCalendar,
  IconSearch,
  IconExpand,
  IconList,
} from "@arco-design/web-react/icon";
import DateRangeFilter from "../../../core/components/filters/components/DateRangeFilter";
import InputSearchFilter from "../../../core/components/filters/components/InputSearchFilter";
import type { FilterDropdownProps } from "../../../core/components/filters/interface/filter.interface";
import type {
  GenericTableColumnConfig,
  ImplementedTableProps,
} from "../../../core/components/generic_table/generic-table.interface";
import { Button } from "@arco-design/web-react";
import GenericTable from "../../../core/components/generic_table/GenericTable";
import type { ProjectListRecord } from "../project.interface";
import { useRef } from "react";
import RadioFilter from "../../../core/components/filters/components/RadioFilter";
const ProjectTable = ({
  onDetailOpen,
  data,
  onTableChange,
  loading,
}: ImplementedTableProps<ProjectListRecord>) => {
  const columns = useRef<GenericTableColumnConfig<ProjectListRecord>[]>([
    {
      key: "name",
      title: "Nama",
      dataIndex: "name",
      width: 150,
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
      key: "owner",
      title: "Pemilik",
      dataIndex: "owner",
      width: 150,
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
      key: "city",
      title: "Kota",
      dataIndex: "city",
      width: 150,
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
      key: "start_date",
      title: "Mulai",
      dataIndex: "start_date",
      width: 100,
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
      key: "end_date",
      title: "Selesai",
      dataIndex: "end_date",
      width: 100,
      sorter: true,
      render: (_: unknown, record: ProjectListRecord) => {
        return record.end_date ?? "-";
      },
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
      key: "status",
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (_: unknown, record: ProjectListRecord) => {
        return record.end_date ? "COMPLETED" : "ONGOING";
      },
      filterIcon: <IconList />,
      filterDropdown: ({
        setFilterKeys,
        filterKeys,
        confirm,
      }: FilterDropdownProps) => {
        return (
          <RadioFilter
            setFilterKeys={setFilterKeys}
            filterKeys={filterKeys}
            confirm={confirm}
            options={["ONGOING", "COMPLETED"]}
          />
        );
      },
    },
    {
      key: "action",
      title: "",
      dataIndex: "action",
      width: 1,
      render: (
        _: unknown,
        record: ProjectListRecord,
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
  ]);

  return (
    <GenericTable
      data={data}
      columns={columns.current}
      onTableChange={onTableChange}
      onDetailOpen={onDetailOpen}
      loading={loading}
    />
  );
};

export default ProjectTable;
