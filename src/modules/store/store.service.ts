import { http } from "../../core/http";
import { STORE_API_ENDPOINTS } from "./store.api";

const useStoreService = () => {
  const fetchStoresName = async () => {
    const response = await http.get(`${STORE_API_ENDPOINTS.LIST_NAMES}`);
    return Promise.resolve(response.data as string[]);
  };

  return {
    fetchStoresName,
  };
};

export default useStoreService;
