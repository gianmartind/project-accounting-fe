import { Space, Button, type PaginationProps } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type {
  PurchaseListRecordFilter,
  PurchaseListRecordRequest,
  PurchaseListRecordResponse,
} from "../purchase.interface";
import usePurchaseService from "../purchase.service";
import PurchaseTable from "../components/PurchaseTable";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";

const PurchasePage = () => {
  const { fetchPurchaseRecord } = usePurchaseService();

  const [purchaseList, setPurchaseList] = useState<PurchaseListRecordResponse>({
    content: [],
    total_elements: 0,
    total_pages: 1,
    size: 10,
    number: 1,
  });

  const handleTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseListRecordFilter, string[]>>
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
  };
  const { failed } = useNotification();

  const getPurchaseRecordData = useCallback(
    async (param: PurchaseListRecordRequest) => {
      try {
        const response = await fetchPurchaseRecord(param);
        setPurchaseList(response);
      } catch (err) {
        console.log(err);
        failed(NOTIFICATION_MESSAGE.FETCH_FAILED);
      }
    },
    [failed, fetchPurchaseRecord]
  );

  useEffect(() => {
    const param: PurchaseListRecordRequest = {
      page: 0,
      size: 10,
    };
    getPurchaseRecordData(param);
  }, [getPurchaseRecordData]);

  const navigate = useNavigate();

  const handleOpenPurchaseDetail = (uuid: string) => {
    navigate(`/purchase/detail/${uuid}`);
  };
  const handleAddNewPurchase = () => {
    navigate("/purchase/new");
  };
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Space style={{ width: "100%" }} direction="vertical" align="end">
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={handleAddNewPurchase}
          >
            Tambah Pembelian
          </Button>
        </Space>
        <PurchaseTable
          onPuchaseDetailOpen={handleOpenPurchaseDetail}
          data={purchaseList}
          onTableChange={handleTableChange}
        />
      </Space>
    </div>
  );
};

export default PurchasePage;
