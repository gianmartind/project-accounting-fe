import {
  Button,
  Space,
  Table,
  type PaginationProps,
} from "@arco-design/web-react";
import type {
  ProjectListRecordFilter,
  ProjectListRecordRequest,
  ProjectSimple,
  ProjectSimpleResponse,
} from "../project.interface";
import { useCallback, useEffect, useRef, useState } from "react";
import useProjectService from "../project.service";
import {
  IconCalendar,
  IconExpand,
  IconList,
  IconPlus,
  IconSearch,
} from "@arco-design/web-react/icon";
import { useNavigate } from "react-router";
import type { FilterDropdownProps } from "../../../core/components/filters/interface/filter.interface";
import InputSearchFilter from "../../../core/components/filters/components/InputSearchFilter";
import DateRangeFilter from "../../../core/components/filters/components/DateRangeFilter";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import RadioFilter from "../../../core/components/filters/components/RadioFilter";

const ProjectPage = () => {
  const columns = useRef([
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
      key: "address",
      title: "Alamat",
      dataIndex: "address",
      width: 250,
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
      render: (_: unknown, record: ProjectSimple) => {
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
      render: (_: unknown, record: ProjectSimple) => {
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
      render: (_: unknown, record: ProjectSimple) => {
        return (
          <Button
            type="text"
            icon={<IconExpand />}
            onClick={() => handleOpenProjectDetail(record.uuid)}
          >
            Detail
          </Button>
        );
      },
    },
  ]);

  const [projectList, setProjectList] = useState<ProjectSimpleResponse>({
    content: [],
    total_elements: 0,
    total_pages: 1,
    size: 10,
    number: 1,
  });
  const { fetchProjects } = useProjectService();
  const getProjectList = useCallback(
    async (param: ProjectListRecordRequest) => {
      const response = await fetchProjects(param);
      setProjectList(response);
    },
    [fetchProjects]
  );

  useEffect(() => {
    const param: ProjectListRecordRequest = {
      page: 0,
      size: 10,
    };
    getProjectList(param);
  }, [getProjectList]);

  useEffect(() => {
    setPagination({
      sizeCanChange: true,
      showTotal: true,
      total: projectList.total_elements,
      pageSize: projectList.size,
      current: projectList.number + 1,
      pageSizeChangeResetCurrent: true,
    });
  }, [projectList]);

  const navigate = useNavigate();
  const handleOpenProjectDetail = (uuid: string) => {
    navigate(`/project/detail/${uuid}`);
  };
  const handleAddNewProject = () => {
    navigate("/project/new");
  };

  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const handleTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof ProjectListRecordFilter, string[]>>
  ) => {
    const sort =
      !Array.isArray(sorter) && sorter.direction
        ? `${sorter.field}:${sorter.direction}`
        : undefined;
    const param: ProjectListRecordRequest = {
      page: (pagination.current ?? 1) - 1,
      size: pagination.pageSize ?? 10,
      sort: sort,
      name: filters.name ? filters.name[0] : undefined,
      start_date_from: filters.start_date ? filters.start_date[0] : undefined,
      start_date_to: filters.start_date ? filters.start_date[1] : undefined,
      end_date_from: filters.end_date ? filters.end_date[0] : undefined,
      end_date_to: filters.end_date ? filters.end_date[1] : undefined,
      status: filters.status ? (filters.status[0] as "COMPLETED" | "ONGOING") : undefined,
    };
    getProjectList(param);
  };

  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Space style={{ width: "100%" }} direction="vertical" align="end">
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={handleAddNewProject}
          >
            Tambah Project
          </Button>
        </Space>
        <Table
          rowKey="uuid"
          columns={columns.current}
          data={projectList.content}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Space>
    </div>
  );
};

export default ProjectPage;
