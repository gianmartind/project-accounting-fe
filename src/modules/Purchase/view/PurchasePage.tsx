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
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";

const PurchasePage = () => {
  const { fetchPurchaseRecord, fetchAvailableFilterOptions } =
    usePurchaseService();

  const [purchaseList, setPurchaseList] = useState<PurchaseListRecordResponse>({
    content: [],
    total_elements: 0,
    total_pages: 1,
    size: 10,
    number: 1,
  });
  const [projectOptions, setProjectOptions] = useState<Array<string>>([]);
  const [storeOptions, setStoreOptions] = useState<Array<string>>([]);

  const handleTableChange = (
    pagination: PaginationProps,
    _: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseListRecord, string[]>>
  ) => {
    const param: PurchaseListRecordRequest = {
      page: (pagination.current ?? 1) - 1,
      size: pagination.pageSize ?? 10,
      project_name: filters.project_name ? filters.project_name[0] : undefined,
      store_name: filters.store_name ? filters.store_name[0] : undefined,
    };
    getPurchaseRecordData(param);
  };

  const getPurchaseRecordData = async (param: PurchaseListRecordRequest) => {
    const response = await fetchPurchaseRecord(param);
    setPurchaseList(response);
  };

  useEffect(() => {
    const param: PurchaseListRecordRequest = {
      page: 0,
      size: 10,
    };
    fetchAvailableFilterOptions()
      .then((options) => {
        console.log(options)
        setProjectOptions(options.project_options);
        setStoreOptions(options.store_options);
      })
      .then(() => {
        getPurchaseRecordData(param);
      });
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
          projectOptions={projectOptions}
          storeOptions={storeOptions}
        />
      </Space>
    </div>
  );
};

export default PurchasePage;
