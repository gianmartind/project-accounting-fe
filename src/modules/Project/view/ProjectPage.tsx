import {
  Button,
  Space,
  Table,
  type PaginationProps,
} from "@arco-design/web-react";
import type {
  ProjectSimple,
  ProjectSimpleResponse,
} from "../project.interface";
import { useEffect, useRef, useState } from "react";
import useProjectService from "../project.service";
import { IconExpand, IconPlus } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router";

const ProjectPage = () => {
  const columns = useRef([
    {
      key: "name",
      title: "Project Name",
      dataIndex: "name",
    },
    {
      key: "start_date",
      title: "Start Date",
      dataIndex: "start_date",
    },
    {
      key: "end_date",
      title: "End Date",
      dataIndex: "end_date",
      render: (_: unknown, record: ProjectSimple) => {
        return <>{record.end_date ? record.end_date : "(ongoing)"}</>;
      },
    },
    {
      key: "action",
      title: "Action",
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
  const getProjectList = async (page: number, size: number) => {
    const response = await fetchProjects(page, size);
    setProjectList(response);
  };

  useEffect(() => {
    getProjectList(0, 10);
  }, []);

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
  const handleTableChange = (pagination: PaginationProps) => {
    const page = (pagination.current ?? 1) - 1;
    const size = pagination.pageSize ?? 10;
    getProjectList(page, size);
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
