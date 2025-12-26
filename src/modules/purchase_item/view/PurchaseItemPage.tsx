import { Space, type PaginationProps } from "@arco-design/web-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import usePurchaseItemService from "../purchase-item.service";
import PurchaseItemTable from "../components/PurchaseItemTable";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import type {
  PurchaseItemListRecordFilter,
  PurchaseItemListRecordRequest,
  PurchaseItemListRecordResponse,
} from "../purchase-item.interface";

const PurchaseItemPage = () => {
  const { fetchPurchaseItemRecord } = usePurchaseItemService();

  const [purchaseItemList, setPurchaseItemList] =
    useState<PurchaseItemListRecordResponse>({
      content: [],
      total_elements: 0,
      total_pages: 1,
      size: 10,
      number: 1,
    });

  const handleTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseItemListRecordFilter, string[]>>
  ) => {
    const sort =
      !Array.isArray(sorter) && sorter.direction
        ? `${sorter.field}:${sorter.direction}`
        : undefined;
    const param: PurchaseItemListRecordRequest = {
      page: (pagination.current ?? 1) - 1,
      size: pagination.pageSize ?? 10,
      sort: sort,
      name: filters.name ? filters.name[0] : undefined,
      type: filters.type ? filters.type[0] : undefined,
      brand: filters.brand ? filters.brand[0] : undefined,
      category: filters.category ? filters.category[0] : undefined,
      unit: filters.unit ? filters.unit[0] : undefined,
      store_name: filters.store_name ? filters.store_name[0] : undefined,
      project_name: filters.project_name ? filters.project_name[0] : undefined,
      purchase_date_from: filters.purchase_date
        ? filters.purchase_date[0]
        : undefined,
      purchase_date_to: filters.purchase_date
        ? filters.purchase_date[1]
        : undefined,
      amount_min: filters.amount ? Number(filters.amount[0]) : undefined,
      amount_max: filters.amount ? Number(filters.amount[1]) : undefined,
      price_min: filters.price ? Number(filters.price[0]) : undefined,
      price_max: filters.price ? Number(filters.price[1]) : undefined,
      total_price_min: filters.total_price
        ? Number(filters.total_price[0])
        : undefined,
      total_price_max: filters.total_price
        ? Number(filters.total_price[1])
        : undefined,
    };
    getPurchaseItemRecordData(param);
  };

  const getPurchaseItemRecordData = useCallback(
    async (param: PurchaseItemListRecordRequest) => {
      const response = await fetchPurchaseItemRecord(param);
      setPurchaseItemList(response);
    },
    [fetchPurchaseItemRecord]
  );

  useEffect(() => {
    const param: PurchaseItemListRecordRequest = {
      page: 0,
      size: 10,
    };
    getPurchaseItemRecordData(param);
  }, [getPurchaseItemRecordData]);

  const navigate = useNavigate();

  const handleOpenPurchase = (uuid: string) => {
    navigate(`/purchase/detail/${uuid}`);
  };

  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <PurchaseItemTable
          onOpenPurchase={handleOpenPurchase}
          data={purchaseItemList}
          onTableChange={handleTableChange}
        />
      </Space>
    </div>
  );
};

export default PurchaseItemPage;
