import { http } from "../../core/http";
import { PURCHASE_API_ENDPOINTS } from "./purchase.api";
import type {
  AvailableFilterOptions,
  PurchaseDetail,
  PurchaseListRecordRequest,
  PurchaseListRecordResponse,
} from "./purchase.interface";

const usePurchaseService = () => {
  const fetchPurchaseRecord = async (
    param: PurchaseListRecordRequest
  ): Promise<PurchaseListRecordResponse> => {
    const response = await http.get(PURCHASE_API_ENDPOINTS.LIST, {
      params: param,
    });
    return Promise.resolve(response.data as PurchaseListRecordResponse);
  };

  const insertPurchase = async (
    body: PurchaseDetail
  ): Promise<PurchaseDetail> => {
    const response = await http.post(`${PURCHASE_API_ENDPOINTS.INSERT}`, body);
    return Promise.resolve(response.data as PurchaseDetail);
  };

  const updatePurchase = async (
    uuid: string,
    body: PurchaseDetail
  ): Promise<PurchaseDetail> => {
    const response = await http.post(
      `${PURCHASE_API_ENDPOINTS.UPDATE}/${uuid}`,
      body
    );
    return Promise.resolve(response.data as PurchaseDetail);
  };

  const fetchItemTypes = async (): Promise<string[]> => {
    const response = await http.get(
      `${PURCHASE_API_ENDPOINTS.LIST_ITEM_TYPES}`
    );
    return Promise.resolve(response.data as string[]);
  };

  const fetchPurchaseDetail = async (uuid: string): Promise<PurchaseDetail> => {
    const response = await http.get(`${PURCHASE_API_ENDPOINTS.DETAIL}/${uuid}`);
    return Promise.resolve(response.data as PurchaseDetail);
  };

  const fetchAvailableFilterOptions =
    async (): Promise<AvailableFilterOptions> => {
      const response = await http.get(
        `${PURCHASE_API_ENDPOINTS.AVAILABLE_FILTER_OPTIONS}`
      );
      return Promise.resolve(response.data as AvailableFilterOptions);
    };

  return {
    fetchPurchaseRecord,
    insertPurchase,
    updatePurchase,
    fetchItemTypes,
    fetchPurchaseDetail,
    fetchAvailableFilterOptions,
  };
};

export default usePurchaseService;
