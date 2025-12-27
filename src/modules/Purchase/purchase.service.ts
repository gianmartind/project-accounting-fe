import { http } from "../../core/http";
import { PURCHASE_API_ENDPOINTS } from "./purchase.api";
import { useCallback } from "react";
import type {
  PurchaseDetail,
  PurchaseListRecordRequest,
  PurchaseListRecordResponse,
} from "./purchase.interface";

const usePurchaseService = () => {
  const fetchPurchaseRecord = useCallback(
    async (
      param: PurchaseListRecordRequest
    ): Promise<PurchaseListRecordResponse> => {
      const response = await http.get(PURCHASE_API_ENDPOINTS.LIST, {
        params: param,
      });
      return Promise.resolve(response.data as PurchaseListRecordResponse);
    },
    []
  );

  const insertPurchase = useCallback(
    async (body: PurchaseDetail): Promise<PurchaseDetail> => {
      const response = await http.post(`${PURCHASE_API_ENDPOINTS.INSERT}`, body);
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
    fetchPurchaseDetail,
  };
};

export default usePurchaseService;
