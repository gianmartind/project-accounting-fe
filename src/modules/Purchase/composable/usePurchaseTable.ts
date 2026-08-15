import type { PaginationProps } from "@arco-design/web-react";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import { useState, useCallback } from "react";
import type { BaseListRecordResponse } from "../../../core/base.interface";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import useNotification from "../../../core/notification.service";
import type {
  PurchaseListRecord,
  PurchaseListRecordRequest,
} from "../purchase.interface";
import usePurchaseService from "../purchase.service";

export const usePurchaseTable = () => {
  const { fetchPurchaseRecord } = usePurchaseService();
  const [purchaseTableLoading, setPurchaseTableLoading] =
    useState<boolean>(false);
  const [purchaseList, setPurchaseList] = useState<
    BaseListRecordResponse<PurchaseListRecord>
  >({
    content: [],
    total_elements: 0,
    total_pages: 1,
    size: 10,
    number: 1,
  });

  const handlePurchaseTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseListRecord, string[]>>,
  ) => {
    const sort =
      !Array.isArray(sorter) && sorter.direction
        ? `${sorter.field}:${sorter.direction}`
        : undefined;
    const param: PurchaseListRecordRequest = {
      page: (pagination.current ?? 1) - 1,
      size: pagination.pageSize ?? 10,
      sort: sort,
      project_name: filters.project_name ? filters.project_name[0] : undefined,
      store_name: filters.store_name ? filters.store_name[0] : undefined,
      purchase_date_from: filters.purchase_date
        ? filters.purchase_date[0]
        : undefined,
      purchase_date_to: filters.purchase_date
        ? filters.purchase_date[1]
        : undefined,
    };
    getPurchaseRecordData(param);
    return param;
  };

  const { failed } = useNotification();
  const getPurchaseRecordData = useCallback(
    async (param: PurchaseListRecordRequest) => {
      try {
        setPurchaseTableLoading(true);
        const response = await fetchPurchaseRecord(param);
        setPurchaseList(response);
      } catch (err) {
        console.log(err);
        failed(NOTIFICATION_MESSAGE.FETCH_FAILED);
      } finally {
        setPurchaseTableLoading(false);
      }
    },
    [failed, fetchPurchaseRecord],
  );

  return {
    purchaseList,
    handlePurchaseTableChange,
    getPurchaseRecordData,
    purchaseTableLoading,
  };
};
