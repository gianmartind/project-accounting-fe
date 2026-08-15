import { Button, Space, type PaginationProps } from "@arco-design/web-react";
import type {
  ProjectListRecordFilter,
  ProjectListRecordRequest,
  ProjectListRecord,
} from "../project.interface";
import { useCallback, useEffect, useState } from "react";
import useProjectService from "../project.service";
import { IconPlus } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import type { BaseListRecordResponse } from "../../../core/base.interface";
import ProjectTable from "../components/ProjectTable";

const ProjectPage = () => {
  const [projectList, setProjectList] = useState<
    BaseListRecordResponse<ProjectListRecord>
  >({
    content: [],
    total_elements: 0,
    total_pages: 1,
    size: 10,
    number: 1,
  });
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const { fetchProjects } = useProjectService();
  const { failed } = useNotification();

  const getProjectList = useCallback(
    async (param: ProjectListRecordRequest) => {
      try {
        setTableLoading(true);
        const response = await fetchProjects(param);
        setProjectList(response);
      } catch (err) {
        console.log(err);
        failed(NOTIFICATION_MESSAGE.FETCH_FAILED);
      } finally {
        setTableLoading(false);
      }
    },
    [failed, fetchProjects],
  );

  useEffect(() => {
    const param: ProjectListRecordRequest = {
      page: 0,
      size: 10,
    };
    getProjectList(param);
  }, [getProjectList]);

  const navigate = useNavigate();
  const handleOpenProjectDetail = (uuid: string) => {
    navigate(`/project/detail/${uuid}`);
  };
  const handleAddNewProject = () => {
    navigate("/project/new");
  };
  const handleTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof ProjectListRecordFilter, string[]>>,
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
      owner: filters.owner ? filters.owner[0] : undefined,
      city: filters.city ? filters.city[0] : undefined,
      start_date_from: filters.start_date ? filters.start_date[0] : undefined,
      start_date_to: filters.start_date ? filters.start_date[1] : undefined,
      end_date_from: filters.end_date ? filters.end_date[0] : undefined,
      end_date_to: filters.end_date ? filters.end_date[1] : undefined,
      status: filters.status
        ? (filters.status[0] as "COMPLETED" | "ONGOING")
        : undefined,
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
            Tambah Proyek
          </Button>
        </Space>
        <ProjectTable
          data={projectList}
          onTableChange={handleTableChange}
          onDetailOpen={handleOpenProjectDetail}
          loading={tableLoading}
        />
      </Space>
    </div>
  );
};

export default ProjectPage;
