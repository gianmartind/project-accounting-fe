import { Space, Button } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { PurchaseListRecordRequest } from "../purchase.interface";
import PurchaseTable from "../components/PurchaseTable";
import { usePurchaseTable } from "../composable/usePurchaseTable";
const PurchasePage = () => {
  const {
    purchaseList,
    handlePurchaseTableChange,
    getPurchaseRecordData,
    purchaseTableLoading,
  } = usePurchaseTable();

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
          onDetailOpen={handleOpenPurchaseDetail}
          data={purchaseList}
          onTableChange={handlePurchaseTableChange}
          loading={purchaseTableLoading}
        />
      </Space>
    </div>
  );
};

export default PurchasePage;
