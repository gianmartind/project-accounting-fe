import { http } from "../../core/http";
import { useCallback } from "react";
import { PURCHASE_ITEM_API_ENDPOINTS } from "./purchase-item.api";
import type {
  PurchaseItemListRecordRequest,
  PurchaseItemListRecordResponse,
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
  };
};

export default usePurchaseItemService;
