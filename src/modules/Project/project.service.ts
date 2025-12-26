import type { ProjectDetail, ProjectListRecordRequest, ProjectSimpleResponse } from "./project.interface";
import { PROJECT_API_ENDPOINTS } from "./project.api";
import { http } from "../../core/http";
import { useCallback } from "react";

const useProjectService = () => {
  const fetchProjects = useCallback(
    async (param: ProjectListRecordRequest): Promise<ProjectSimpleResponse> => {
      const response = await http.get(PROJECT_API_ENDPOINTS.LIST, {
        params: param,
      });
      return Promise.resolve(response.data as ProjectSimpleResponse);
    },
    []
  );

  const getProjectDetail = useCallback(
    async (uuid: string): Promise<ProjectDetail> => {
      const response = await http.get(
        `${PROJECT_API_ENDPOINTS.DETAIL}/${uuid}`
      );
      return Promise.resolve(response.data as ProjectDetail);
    },
    []
  );

  const updateProject = useCallback(
    async (uuid: string, body: ProjectDetail): Promise<ProjectDetail> => {
      const response = await http.post(
        `${PROJECT_API_ENDPOINTS.UPDATE}/${uuid}`,
        body
      );
      return Promise.resolve(response.data as ProjectDetail);
    },
    []
  );

  const insertProject = useCallback(
    async (body: ProjectDetail) => {
      const response = await http.post(`${PROJECT_API_ENDPOINTS.INSERT}`, body);
      return Promise.resolve(response.data as ProjectDetail);
    },
    []
  );

  return { fetchProjects, getProjectDetail, updateProject, insertProject };
};

export default useProjectService;
