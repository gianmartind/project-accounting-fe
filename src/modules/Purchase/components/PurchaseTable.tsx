import { Button, Table, type PaginationProps } from "@arco-design/web-react";
import { IconExpand, IconSearch } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import type {
  PurchaseListRecord,
  PurchaseListRecordResponse,
} from "../purchase.interface";
import RadioFilter from "../../../core/components/filters/RadioFilter";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";

type Props = {
  data: PurchaseListRecordResponse;
  onTableChange: (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseListRecord, string[]>>
  ) => void;
  onPuchaseDetailOpen: (uuid: string) => void;
  projectOptions?: Array<string>;
  storeOptions?: Array<string>;
};

const PurchaseTable = ({
  data,
  onTableChange,
  onPuchaseDetailOpen,
  projectOptions,
  storeOptions,
}: Props) => {
  const columns = [
    {
      key: "purchase_date",
      title: "Purchase Date",
      dataIndex: "purchase_date",
    },
    {
      key: "project_name",
      title: "Project Name",
      dataIndex: "project_name",
      filterIcon: <IconSearch />,
      filterDropdown: ({ setFilterKeys, filterKeys, confirm }: any) => {
        return (
          <RadioFilter
            options={projectOptions ?? []}
            setFilterKeys={setFilterKeys}
            filterKeys={filterKeys}
            confirm={confirm}
          />
        );
      },
    },
    {
      key: "store_name",
      title: "Store Name",
      dataIndex: "store_name",
      filterIcon: <IconSearch />,
      filterDropdown: ({ setFilterKeys, filterKeys, confirm }: any) => {
        return (
          <RadioFilter
            options={storeOptions ?? []}
            setFilterKeys={setFilterKeys}
            filterKeys={filterKeys}
            confirm={confirm}
          />
        );
      },
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
  ];

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

  const handleTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseListRecord, string[]>>
  ) => {
    onTableChange(pagination, sorter, filters);
  };

  return (
    <Table
      rowKey="uuid"
      columns={columns}
      onChange={handleTableChange}
      pagination={pagination}
      data={data.content}
    />
  );
};

export default PurchaseTable;
