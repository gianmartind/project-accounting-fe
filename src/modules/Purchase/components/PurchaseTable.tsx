import { Button, Table, type PaginationProps } from "@arco-design/web-react";
import { IconExpand } from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import type {
  PurchaseListRecord,
  PurchaseListRecordResponse,
} from "../purchase.interface";

type Props = {
  data: PurchaseListRecordResponse;
  onTableChange: (pagination: PaginationProps) => void;
  onPuchaseDetailOpen: (uuid: string) => void;
};

const PurchaseTable = ({ data, onTableChange, onPuchaseDetailOpen }: Props) => {
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
            onClick={() => onPuchaseDetailOpen(record.uuid)}
          >
            Detail
          </Button>
        );
      },
    },
  ]);
  const [pagination, setPagination] = useState<PaginationProps>({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  useEffect(() => {
    setPagination({
      sizeCanChange: true,
      showTotal: true,
      total: data.total_elements,
      pageSize: data.size,
      current: data.number + 1,
      pageSizeChangeResetCurrent: true,
    });
  }, [data]);

  const handleTableChange = (pagination: PaginationProps) => {
    onTableChange(pagination);
  };

  return (
    <Table
      rowKey="uuid"
      columns={columns.current}
      onChange={handleTableChange}
      pagination={pagination}
      data={data.content}
    />
  );
};

export default PurchaseTable;
