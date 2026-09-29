import { Button, Space } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { useStoreTable } from "../composable/useStoreTable";
import StoreTable from "../components/StoreTable";
import { useEffect } from "react";
import type { StoreListRecordRequest } from "../store.interface";
import { useNavigate } from "react-router";

const PurchasePage = () => {
  const {
    storeList,
    tagOptions,
    handleStoreTableChange,
    getStoreRecordData,
    storeTableLoading,
  } = useStoreTable();

  useEffect(() => {
    const param: StoreListRecordRequest = {
      page: 0,
      size: 10,
    };
    getStoreRecordData(param);
  }, [getStoreRecordData]);

  const navigate = useNavigate();

  const handleOpenStoreDetail = (uuid: string) => {
    navigate(`/store/detail/${uuid}`);
  };
  const handleAddNewStore = () => {
    navigate("/store/new");
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
            onClick={handleAddNewStore}
          >
            Tambah Toko
          </Button>
        </Space>
        <StoreTable
          data={storeList}
          onTableChange={handleStoreTableChange}
          onDetailOpen={handleOpenStoreDetail}
          loading={storeTableLoading}
          tagOptions={tagOptions}
        />
      </Space>
    </div>
  );
};

export default PurchasePage;
