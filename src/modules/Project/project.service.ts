import type { ProjectDetail, ProjectSimple } from "./project.interface";
import { PROJECT_API_ENDPOINTS } from "./project.api";
import { http } from "../../core/http";

const useProjectService = () => {
  const fetchProjects = async (
    page: number,
    size: number
  ): Promise<ProjectSimple[]> => {
    const response = await http.get(PROJECT_API_ENDPOINTS.LIST, {
      params: {
        page: page,
        size: size,
      },
    });
    return Promise.resolve(response.data.content as ProjectSimple[]);
  };

  const getProjectDetail = async (uuid: string): Promise<ProjectDetail> => {
    const response = await http.get(`${PROJECT_API_ENDPOINTS.DETAIL}/${uuid}`);
    return Promise.resolve(response.data as ProjectDetail);
  };

  const updateProject = async (
    uuid: string,
    body: ProjectDetail
  ): Promise<ProjectDetail> => {
    const response = await http.post(
      `${PROJECT_API_ENDPOINTS.UPDATE}/${uuid}`,
      body
    );
    return Promise.resolve(response.data as ProjectDetail);
  };

  const insertProject = async (body: ProjectDetail) => {
    const response = await http.post(`${PROJECT_API_ENDPOINTS.INSERT}`, body);
    return Promise.resolve(response.data as ProjectDetail);
  };

  return { fetchProjects, getProjectDetail, updateProject, insertProject };
};

export default useProjectService;
