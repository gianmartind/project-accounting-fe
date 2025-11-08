import { Space, Button, type PaginationProps } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type {
  PurchaseListRecord,
  PurchaseListRecordRequest,
  PurchaseListRecordResponse,
} from "../purchase.interface";
import usePurchaseService from "../purchase.service";
import PurchaseTable from "../components/PurchaseTable";

const PurchasePage = () => {
  const { fetchPurchaseRecord } = usePurchaseService();

  const [purchaseList, setPurchaseList] = useState<PurchaseListRecordResponse>({
    content: [],
    total_elements: 0,
    total_pages: 1,
    size: 10,
    number: 1,
  });

  const handleTableChange = (pagination: PaginationProps) => {
    const param: PurchaseListRecordRequest = {
      page: (pagination.current ?? 1) - 1,
      size: pagination.pageSize ?? 10,
    };
    getPurchaseRecordData(param);
  }

  const getPurchaseRecordData = async (param: PurchaseListRecordRequest) => {
    const response = await fetchPurchaseRecord(param);
    setPurchaseList(response);
  }

  useEffect(() => {
    const param: PurchaseListRecordRequest = {
      page: 0,
      size: 10,
    };
    getPurchaseRecordData(param);
  }, []);

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
