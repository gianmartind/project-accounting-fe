import { http } from "../../core/http";
import { useCallback } from "react";
import { STORE_API_ENDPOINTS } from "./store.api";
import type { BaseListRecordResponse } from "../../core/base.interface";
import type {
  StoreDetail,
  StoreListRecord,
  StoreListRecordRequest,
} from "./store.interface";

const useStoreService = () => {
  const fetchStores = useCallback(
    async (
      param: StoreListRecordRequest,
    ): Promise<BaseListRecordResponse<StoreListRecord>> => {
      const response = await http.get(`${STORE_API_ENDPOINTS.LIST}`, {
        params: param,
        paramsSerializer: {
          indexes: null,
        },
      });
      return Promise.resolve(
        response.data as BaseListRecordResponse<StoreListRecord>,
      );
    },
    [],
  );

  const fetchStoreDetail = useCallback(
    async (uuid: string): Promise<StoreDetail> => {
      const response = await http.get(`${STORE_API_ENDPOINTS.DETAIL}/${uuid}`);
      return Promise.resolve(response.data as StoreDetail);
    },
    [],
  );

  const updateStore = useCallback(
    async (uuid: string, body: StoreDetail): Promise<StoreDetail> => {
      const response = await http.post(
        `${STORE_API_ENDPOINTS.UPDATE}/${uuid}`,
        body,
      );
      return Promise.resolve(response.data as StoreDetail);
    },
    [],
  );

  const deleteStore = useCallback(async (uuid: string) => {
    await http.post(`${STORE_API_ENDPOINTS.DELETE}/${uuid}`);
    return Promise.resolve();
  }, []);

  const insertStore = useCallback(async (body: StoreDetail) => {
    const response = await http.post(`${STORE_API_ENDPOINTS.INSERT}`, body);
    return Promise.resolve(response.data as StoreDetail);
  }, []);

  const fetchStoreNames = useCallback(async () => {
    const response = await http.get(`${STORE_API_ENDPOINTS.LIST_NAMES}`);
    return Promise.resolve(response.data as string[]);
  }, []);

  const fetchStoreTags = useCallback(async () => {
    const response = await http.get(`${STORE_API_ENDPOINTS.LIST_TAGS}`);
    return Promise.resolve(response.data as string[]);
  }, []);

  return {
    fetchStores,
    fetchStoreDetail,
    updateStore,
    deleteStore,
    insertStore,
    fetchStoreNames,
    fetchStoreTags,
  };
};

export default useStoreService;
