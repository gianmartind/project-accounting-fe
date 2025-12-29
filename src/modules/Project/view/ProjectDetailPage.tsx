import {
  Button,
  Form,
  Radio,
  Space,
  Typography,
  type PaginationProps,
} from "@arco-design/web-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProjectService from "../project.service";
import type { ProjectDetail } from "../project.interface";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import ProjectForm from "../components/ProjectForm";
import type {
  PurchaseListRecordFilter,
  PurchaseListRecordRequest,
  PurchaseListRecordResponse,
} from "../../Purchase/purchase.interface";
import usePurchaseService from "../../Purchase/purchase.service";
import PurchaseTable from "../../Purchase/components/PurchaseTable";
import { IconDelete, IconPlus } from "@arco-design/web-react/icon";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import PurchaseItemTable from "../../purchase_item/components/PurchaseItemTable";
import type {
  PurchaseItemListRecordFilter,
  PurchaseItemListRecordRequest,
  PurchaseItemListRecordResponse,
} from "../../purchase_item/purchase-item.interface";
import usePurchaseItemService from "../../purchase_item/purchase-item.service";
import SummaryCard from "../../../core/components/SummaryCard";
import useConfirmation from "../../../core/components/confirmation.services";
import { rupiahFormat } from "../../../core/utils";

const ProjectDetailPage = () => {
  const { uuid } = useParams();
  const { getProjectDetail, deleteProject, updateProject } =
    useProjectService();
  const [originalProjectDetail, setOriginalProjectDetail] =
    useState<ProjectDetail>();

  useEffect(() => {
    getProjectDetail(uuid ?? "").then((response) => {
      setOriginalProjectDetail(response);
    });
  }, [getProjectDetail, uuid]);

  const [form] = Form.useForm<ProjectDetail>();
  useEffect(() => {
    form.setFieldsValue({ ...originalProjectDetail });
  }, [form, originalProjectDetail]);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, ...originalProjectValue } =
      originalProjectDetail as ProjectDetail;
    setFormIsValid(
      JSON.stringify(form.getFieldsValue()) !==
        JSON.stringify(originalProjectValue)
    );
  };

  const { success, failed } = useNotification();
  const handleSave = async () => {
    try {
      await form.validate();
      const response = await updateProject(
        uuid ?? "",
        form.getFieldsValue() as ProjectDetail
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      setOriginalProjectDetail(response);
    } catch (err) {
      console.log(err);
      form.setFieldsValue({ ...originalProjectDetail });
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    }
  };

  // Variables for Purchase Section
  const { fetchPurchaseRecord } = usePurchaseService();
  const getPurchaseRecordData = useCallback(
    async (param: PurchaseListRecordRequest) => {
      const response = await fetchPurchaseRecord(param);
      setPurchaseList(response);
    },
    [fetchPurchaseRecord]
  );
  const handlePurchaseTableChange = (
    pagination: PaginationProps,
    sorter: SorterInfo | SorterInfo[],
    filters: Partial<Record<keyof PurchaseListRecordFilter, string[]>>
  ) => {
    const sort =
      !Array.isArray(sorter) && sorter.direction
        ? `${sorter.field}:${sorter.direction}`
        : undefined;
    const param: PurchaseListRecordRequest = {
      project_uuid: uuid,
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
  const [purchaseList, setPurchaseList] = useState<PurchaseListRecordResponse>({
    content: [],
    total_elements: 0,
    total_pages: 1,
    size: 10,
    number: 1,
  });
  useEffect(() => {
    const param: PurchaseListRecordRequest = {
      project_uuid: uuid,
      page: 0,
      size: 10,
    };
    getPurchaseRecordData(param);
  }, [getPurchaseRecordData, uuid]);

  // Variables for PurchaseItem Section
  const { fetchPurchaseItemRecord, fetchTotalProjectPrice } =
    usePurchaseItemService();

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
      project_uuid: uuid,
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
      project_uuid: uuid,
      page: 0,
      size: 10,
    };
    getPurchaseItemRecordData(param);
  }, [getPurchaseItemRecordData, uuid]);

  const navigate = useNavigate();

  const handleOpenPurchase = (uuid: string) => {
    navigate(`/purchase/detail/${uuid}`);
  };

  const handleOpenPurchaseDetail = (uuid: string) => {
    navigate(`/purchase/detail/${uuid}`);
  };
  const handleAddNewPurchase = () => {
    navigate(`/purchase/new/${uuid}`);
  };

  const [puchaseDisplay, setPurchaseDisplay] = useState<
    "purchase" | "purchase_item"
  >("purchase");

  // Summary Card Data
  const [summaryItems, setSummaryItems] = useState<
    { title: string; value: string | number }[]
  >([]);
  const getProjectSummary = useCallback(
    async (project_uuid: string) => {
      const totalProjectPrice = await fetchTotalProjectPrice(project_uuid);
      const totalPrice = {
        title: "Total Pembelian Proyek",
        value: `Rp ${totalProjectPrice ? rupiahFormat(totalProjectPrice) : 0}`,
      };

      const totalProjectTime =
        calculateProjectTime(originalProjectDetail as ProjectDetail) ?? 0;
      const totalTime = {
        title: "Total Waktu Proyek (hari)",
        value: totalProjectTime,
      };
      setSummaryItems([totalTime, totalPrice]);
    },
    [fetchTotalProjectPrice, originalProjectDetail]
  );

  const calculateProjectTime = (project: ProjectDetail) => {
    if (project.start_date) {
      const startDate = new Date(project.start_date);
      const endDate = project.end_date
        ? new Date(project.end_date)
        : new Date();
      const timeDiff = endDate.getTime() - startDate.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return dayDiff;
    }
  };

  useEffect(() => {
    if (uuid) {
      getProjectSummary(uuid);
    }
  }, [getProjectSummary, uuid]);

  // Delete Project
  const { deletion } = useConfirmation();
  const handleDeleteProject = () => {
    deletion("Apakah anda yakin menghapus proyek ini?", async () => {
      try {
        await deleteProject(uuid ?? "");
        success(NOTIFICATION_MESSAGE.DELETE_SUCCESS);
        navigate("/project");
      } catch (err) {
        console.log(err);
        failed(NOTIFICATION_MESSAGE.DELETE_FAILED);
      }
    });
  };
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography.Title heading={5}>Detail Proyek</Typography.Title>
          </div>
          <Button
            status="danger"
            icon={<IconDelete />}
            onClick={handleDeleteProject}
          >
            Hapus Proyek
          </Button>
        </div>
        <SummaryCard items={summaryItems} />
        <ProjectForm
          form={form}
          onValuesChange={validateForm}
          saveDisabled={!formIsValid}
          onSave={handleSave}
        />
      </Space>
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <Typography.Title heading={5}>Pembelian Proyek</Typography.Title>
          </div>
          <Radio.Group
            type="button"
            defaultValue="purchase"
            onChange={(value) => setPurchaseDisplay(value)}
          >
            <Radio value="purchase">Pembelian</Radio>
            <Radio value="purchase_item">Item</Radio>
          </Radio.Group>
          <div style={{ width: "1vw" }}></div>
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={handleAddNewPurchase}
          >
            Tambah Pembelian
          </Button>
        </div>
        {puchaseDisplay === "purchase" && (
          <PurchaseTable
            onPuchaseDetailOpen={handleOpenPurchaseDetail}
            data={purchaseList}
            onTableChange={handlePurchaseTableChange}
          />
        )}
        {puchaseDisplay === "purchase_item" && (
          <PurchaseItemTable
            onOpenPurchase={handleOpenPurchase}
            data={purchaseItemList}
            onTableChange={handleTableChange}
          />
        )}
      </Space>
    </Space>
  );
};

export default ProjectDetailPage;
