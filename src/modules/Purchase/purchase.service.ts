import { http } from "../../core/http";
import { PURCHASE_API_ENDPOINTS } from "./purchase.api";
import { useCallback } from "react";
import type {
  PurchaseDetail,
  PurchaseListRecord,
  PurchaseListRecordRequest,
} from "./purchase.interface";
import type { BaseListRecordResponse } from "../../core/base.interface";

const usePurchaseService = () => {
  const fetchPurchaseRecord = useCallback(
    async (
      param: PurchaseListRecordRequest
    ): Promise<BaseListRecordResponse<PurchaseListRecord>> => {
      const response = await http.get(PURCHASE_API_ENDPOINTS.LIST, {
        params: param,
      });
      return Promise.resolve(response.data as BaseListRecordResponse<PurchaseListRecord>);
    },
    []
  );

  const insertPurchase = useCallback(
    async (body: PurchaseDetail): Promise<PurchaseDetail> => {
      const response = await http.post(
        `${PURCHASE_API_ENDPOINTS.INSERT}`,
        body
      );
      return Promise.resolve(response.data as PurchaseDetail);
    },
    []
  );

  const updatePurchase = useCallback(
    async (uuid: string, body: PurchaseDetail): Promise<PurchaseDetail> => {
      const response = await http.post(
        `${PURCHASE_API_ENDPOINTS.UPDATE}/${uuid}`,
        body
      );
      return Promise.resolve(response.data as PurchaseDetail);
    },
    []
  );

  const deletePurchase = useCallback(async (uuid: string) => {
    await http.post(`${PURCHASE_API_ENDPOINTS.DELETE}/${uuid}`);
    return Promise.resolve();
  }, []);

  const fetchPurchaseDetail = useCallback(
    async (uuid: string): Promise<PurchaseDetail> => {
      const response = await http.get(
        `${PURCHASE_API_ENDPOINTS.DETAIL}/${uuid}`
      );
      return Promise.resolve(response.data as PurchaseDetail);
    },
    []
  );

  return {
    fetchPurchaseRecord,
    insertPurchase,
    updatePurchase,
    deletePurchase,
    fetchPurchaseDetail,
  };
};

export default usePurchaseService;
