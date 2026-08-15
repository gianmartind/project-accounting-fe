import { Space, type PaginationProps } from "@arco-design/web-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import usePurchaseItemService from "../purchase-item.service";
import PurchaseItemTable from "../components/PurchaseItemTable";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import type {
  PurchaseItemListRecord,
  PurchaseItemListRecordRequest,
  PurchaseItemSummary,
} from "../purchase-item.interface";
import SummaryCard from "../../../core/components/SummaryCard";
import { rupiahFormat } from "../../../core/utils";
import { usePurchaseItemTable } from "../composable/usePurchaseItemTable";

const PurchaseItemPage = () => {
  const {
    purchaseItemList,
    handlePurchaseItemTableChange,
    getPurchaseItemRecordData,
    purchaseItemTableLoading,
  } = usePurchaseItemTable();

  const [purchaseItemSummary, setPurchaseItemSummary] =
    useState<PurchaseItemSummary>({
      total_price: 0,
      first_purchase_date: "",
      last_purchase_date: "",
    });

  const { fetchPurchaseItemSummary } = usePurchaseItemService();
  const getPurchaseItemSummary = useCallback(
    async (param: PurchaseItemListRecordRequest) => {
      const summary = await fetchPurchaseItemSummary(param);
      setPurchaseItemSummary(summary);
    },
    [fetchPurchaseItemSummary],
  );
  const handleFetchListRecordAndSummary = useCallback(
    async (
      pagination: PaginationProps,
      sorter: SorterInfo | SorterInfo[],
      filters: Partial<Record<keyof PurchaseItemListRecord, string[]>>,
    ) => {
      const param = await handlePurchaseItemTableChange(pagination, sorter, filters);
      await getPurchaseItemSummary(param);
    },
    [getPurchaseItemRecordData, fetchPurchaseItemSummary],
  );

  useEffect(() => {
    const param: PurchaseItemListRecordRequest = {
      page: 0,
      size: 10,
    };
    getPurchaseItemRecordData(param);
    getPurchaseItemSummary(param);
  }, [getPurchaseItemRecordData]);

  const purchaseItemSummaryItems = () => {
    return [
      {
        title: "Pembelian Pertama",
        value: purchaseItemSummary.first_purchase_date ?? "-",
      },
      {
        title: "Pembelian Terakhir",
        value: purchaseItemSummary.last_purchase_date ?? "-",
      },
      {
        title: "Harga Total Pembelian",
        value: `Rp ${
          purchaseItemSummary.total_price
            ? rupiahFormat(purchaseItemSummary.total_price)
            : 0
        }`,
      },
    ];
  };

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
        <SummaryCard items={purchaseItemSummaryItems()} />
        <PurchaseItemTable
          onDetailOpen={handleOpenPurchase}
          data={purchaseItemList}
          onTableChange={handleFetchListRecordAndSummary}
          loading={purchaseItemTableLoading}
        />
      </Space>
    </div>
  );
};

export default PurchaseItemPage;
