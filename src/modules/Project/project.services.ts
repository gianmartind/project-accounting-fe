import type { ProjectListItem } from "./project.interface";
import { PROJECT_API_ENDPOINTS } from "./project.api";
import { http } from "../../core/http";

const useProjectServices = () => {
  const fetchProjects = async (
    page: number,
    size: number
  ): Promise<ProjectListItem[]> => {
    const response = await http.get(PROJECT_API_ENDPOINTS.LIST, {
      params: {
        page: page,
        size: size,
      },
    });
    return response.data.content as ProjectListItem[];
  };

  return { fetchProjects };
};

export default useProjectServices;
