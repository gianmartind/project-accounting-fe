import { Space, Button, Table } from "@arco-design/web-react";
import { IconExpand, IconPlus } from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import type { PurchaseListRecord } from "../purchase.interface";
import usePurchaseService from "../purchase.service";

const PurchasePage = () => {
  const { fetchPurchaseRecord, fetchPurchaseDetail } = usePurchaseService();

  const columns = useRef([
    {
      key: "purchase_date",
      title: "Purchase Date",
      dataIndex: "purchase_date",
    },
    {
      key: "name",
      title: "Project Name",
      dataIndex: "project_name",
    },
    {
      key: "store_name",
      title: "Store Name",
      dataIndex: "store_name",
    },
    {
      key: "total_price",
      title: "Total Price",
      dataIndex: "total_price",
    },
    {
      key: "action",
      title: "Action",
      dataIndex: "action",
      width: 1,
      render: (_: unknown, record: PurchaseListRecord) => {
        return (
          <Button
            type="text"
            icon={<IconExpand />}
            onClick={() => handleOpenPurchaseDetail(record.uuid)}
          >
            Detail
          </Button>
        );
      },
    },
  ]);

  const [purchaseList, setPurchaseList] = useState<PurchaseListRecord[]>([]);

  useEffect(() => {
    fetchPurchaseRecord(0, 10).then((response) => setPurchaseList(response));
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
            Add New Purchase
          </Button>
        </Space>
        <Table rowKey="uuid" columns={columns.current} data={purchaseList} />
      </Space>
    </div>
  );
};

export default PurchasePage;
