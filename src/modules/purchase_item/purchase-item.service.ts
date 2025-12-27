import { http } from "../../core/http";
import { useCallback } from "react";
import { PURCHASE_ITEM_API_ENDPOINTS } from "./purchase-item.api";
import type {
  PurchaseItemListRecordRequest,
  PurchaseItemListRecordResponse,
  PurchaseItemSummary,
} from "./purchase-item.interface";

const usePurchaseItemService = () => {
  const fetchPurchaseItemRecord = useCallback(
    async (
      param: PurchaseItemListRecordRequest
    ): Promise<PurchaseItemListRecordResponse> => {
      const response = await http.get(PURCHASE_ITEM_API_ENDPOINTS.LIST, {
        params: param,
      });
      return Promise.resolve(response.data as PurchaseItemListRecordResponse);
    },
    []
  );

  const fetchTotalProjectPrice = useCallback(
    async (project_uuid: string): Promise<number> => {
      const response = await http.get(
        PURCHASE_ITEM_API_ENDPOINTS.TOTAL_PROJECT_PRICE,
        {
          params: { project_uuid },
        }
      );
      return Promise.resolve(response.data as number);
    },
    []
  );

  const fetchPurchaseItemSummary = useCallback(
    async (param: PurchaseItemListRecordRequest): Promise<PurchaseItemSummary> => {
      const response = await http.get(
        PURCHASE_ITEM_API_ENDPOINTS.SUMMARY,
        {
          params: param,
        }
      );
      return Promise.resolve(response.data as PurchaseItemSummary);
    },
    []
  );

  const fetchItemTypes = useCallback(async (): Promise<string[]> => {
    const response = await http.get(
      `${PURCHASE_ITEM_API_ENDPOINTS.LIST_ITEM_TYPES}`
    );
    return Promise.resolve(response.data as string[]);
  }, []);

  const fetchItemUnits = useCallback(async (): Promise<string[]> => {
    const response = await http.get(
      `${PURCHASE_ITEM_API_ENDPOINTS.LIST_ITEM_UNITS}`
    );
    return Promise.resolve(response.data as string[]);
  }, []);

  const fetchItemCategories = useCallback(async (): Promise<string[]> => {
    const response = await http.get(
      `${PURCHASE_ITEM_API_ENDPOINTS.LIST_ITEM_CATEGORIES}`
    );
    return Promise.resolve(response.data as string[]);
  }, []);

  const fetchItemBrands = useCallback(async (): Promise<string[]> => {
    const response = await http.get(
      `${PURCHASE_ITEM_API_ENDPOINTS.LIST_ITEM_BRANDS}`
    );
    return Promise.resolve(response.data as string[]);
  }, []);

  return {
    fetchPurchaseItemRecord,
    fetchItemTypes,
    fetchItemUnits,
    fetchItemCategories,
    fetchItemBrands,
    fetchTotalProjectPrice,
    fetchPurchaseItemSummary,
  };
};

export default usePurchaseItemService;
