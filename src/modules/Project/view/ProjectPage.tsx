import { Button, Space, Table } from "@arco-design/web-react";
import type { ProjectSimple } from "../project.interface";
import { useEffect, useRef, useState } from "react";
import useProjectServices from "../project.services";
import { IconExpand } from "@arco-design/web-react/icon";
import Row from "@arco-design/web-react/es/Grid/row";
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

  const [projectList, setProjectList] = useState<ProjectSimple[]>([]);
  const { fetchProjects } = useProjectServices();

  useEffect(() => {
    fetchProjects(0, 10).then((response) => setProjectList(response));
  }, []);

  const navigate = useNavigate();
  const handleOpenProjectDetail = (uuid: string) => {
    navigate(`/project/detail/${uuid}`);
  };

  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Row></Row>
        <Table rowKey="uuid" columns={columns.current} data={projectList} />
      </Space>
    </div>
  );
};

export default ProjectPage;
