import { Table } from "@arco-design/web-react";
import type { ProjectListItem } from "./project.interface";
import { useEffect, useState } from "react";
import useProjectServices from "./project.services";

const ProjectTableColumns = [
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
    render: (_: unknown, record: ProjectListItem) => {
      return <>{record.end_date ? record.end_date : "(ongoing)"}</>;
    },
  },
];

const ProjectPage = () => {
  const [projectList, setProjectList] = useState<ProjectListItem[]>([]);
  const { fetchProjects } = useProjectServices();

  useEffect(() => {
    fetchProjects(0, 10).then((response) => setProjectList(response));
  }, []);
  return (
    <div>
      <Table rowKey="uuid" columns={ProjectTableColumns} data={projectList} />
    </div>
  );
};

export default ProjectPage;
