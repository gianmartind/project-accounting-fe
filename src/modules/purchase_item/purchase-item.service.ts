import { http } from "../../core/http";
import { useCallback } from "react";
import { PURCHASE_ITEM_API_ENDPOINTS } from "./purchase-item.api";

const usePurchaseItemService = () => {
  const fetchItemTypes = useCallback(
    async (): Promise<string[]> => {
      const response = await http.get(
        `${PURCHASE_ITEM_API_ENDPOINTS.LIST_ITEM_TYPES}`
      );
      return Promise.resolve(response.data as string[]);
    },
    []
  );

  const fetchItemUnits = useCallback(
    async (): Promise<string[]> => {
      const response = await http.get(
        `${PURCHASE_ITEM_API_ENDPOINTS.LIST_ITEM_UNITS}`
      );
      return Promise.resolve(response.data as string[]);
    },
    []
  );

  const fetchItemCategories = useCallback(
    async (): Promise<string[]> => {
      const response = await http.get(
        `${PURCHASE_ITEM_API_ENDPOINTS.LIST_ITEM_CATEGORIES}`
      );
      return Promise.resolve(response.data as string[]);
    },
    []
  );

  const fetchItemBrands = useCallback(
    async (): Promise<string[]> => {
      const response = await http.get(
        `${PURCHASE_ITEM_API_ENDPOINTS.LIST_ITEM_BRANDS}`
      );
      return Promise.resolve(response.data as string[]);
    },
    []
  );

  return {
    fetchItemTypes,
    fetchItemUnits,
    fetchItemCategories,
    fetchItemBrands,
  };
};

export default usePurchaseItemService;
