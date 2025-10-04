import { http } from "../../core/http";
import { PURCHASE_API_ENDPOINTS } from "./purchase.api";
import type { PurchaseDetail } from "./purchase.interface"

const usePurchaseService = () => {
    const insertPurchase = async (body: PurchaseDetail) => {
        const response = await http.post(`${PURCHASE_API_ENDPOINTS.INSERT}`, body);
        return Promise.resolve(response.data as PurchaseDetail);
    }

    const fetchItemTypes = async () => {
        const response = await http.get(`${PURCHASE_API_ENDPOINTS.LIST_ITEM_TYPES}`);
        return Promise.resolve(response.data as string[]);
    }

    return { insertPurchase, fetchItemTypes }
}

export default usePurchaseService;