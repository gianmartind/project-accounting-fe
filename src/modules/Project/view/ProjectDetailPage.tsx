import {
  Button,
  Form,
  Radio,
  Space,
  Spin,
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
  PurchaseListRecord,
  PurchaseListRecordRequest,
} from "../../Purchase/purchase.interface";
import usePurchaseService from "../../Purchase/purchase.service";
import { IconDelete, IconPlus } from "@arco-design/web-react/icon";
import type { SorterInfo } from "@arco-design/web-react/es/Table/interface";
import PurchaseItemTable from "../../purchase_item/components/PurchaseItemTable";
import type {
  PurchaseItemListRecord,
  PurchaseItemListRecordRequest,
} from "../../purchase_item/purchase-item.interface";
import usePurchaseItemService from "../../purchase_item/purchase-item.service";
import SummaryCard from "../../../core/components/SummaryCard";
import useConfirmation from "../../../core/components/confirmation.services";
import { rupiahFormat } from "../../../core/utils";
import type { BaseListRecordResponse } from "../../../core/base.interface";
import PurchaseTable from "../../Purchase/components/PurchaseTable";
import { usePurchaseTable } from "../../Purchase/composable/usePurchaseTable";
import { usePurchaseItemTable } from "../../purchase_item/composable/usePurchaseItemTable";

const ProjectDetailPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { uuid } = useParams();
  const { getProjectDetail, deleteProject, updateProject } =
    useProjectService();
  const [originalProjectDetail, setOriginalProjectDetail] =
    useState<ProjectDetail>();

  const [form] = Form.useForm<ProjectDetail>();

  useEffect(() => {
    setPageLoading(true);
    getProjectDetail(uuid ?? "")
      .then((response) => {
        setOriginalProjectDetail(response);
        form.setFieldsValue({ ...response });
      })
      .finally(() => setPageLoading(false));
  }, [getProjectDetail, uuid, form]);

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, ...originalProjectValue } =
      originalProjectDetail as ProjectDetail;
    setFormIsValid(
      JSON.stringify(form.getFieldsValue()) !==
        JSON.stringify(originalProjectValue),
    );
  };

  const { success, failed } = useNotification();
  const handleSave = async () => {
    try {
      setPageLoading(true);
      await form.validate();
      const response = await updateProject(
        uuid ?? "",
        form.getFieldsValue() as ProjectDetail,
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      setOriginalProjectDetail(response);
    } catch (err) {
      console.log(err);
      form.setFieldsValue({ ...originalProjectDetail });
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    } finally {
      setPageLoading(false);
    }
  };

  // Variables for Purchase Section
  const {
    purchaseList,
    handlePurchaseTableChange,
    getPurchaseRecordData,
    purchaseTableLoading,
  } = usePurchaseTable();
  useEffect(() => {
    const param: PurchaseListRecordRequest = {
      project_uuid: uuid,
      page: 0,
      size: 10,
    };
    getPurchaseRecordData(param);
  }, [getPurchaseRecordData, uuid]);

  // Variables for PurchaseItem Section
  const {
    purchaseItemList,
    handlePurchaseItemTableChange,
    getPurchaseItemRecordData,
    purchaseItemTableLoading,
  } = usePurchaseItemTable();
  useEffect(() => {
    const param: PurchaseItemListRecordRequest = {
      project_uuid: uuid,
      page: 0,
      size: 10,
    };
    getPurchaseItemRecordData(param);
  }, [getPurchaseItemRecordData, uuid]);

  const navigate = useNavigate();

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
  const { fetchTotalProjectPrice } = usePurchaseItemService();
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
    [fetchTotalProjectPrice, originalProjectDetail],
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
        setPageLoading(true);
        await deleteProject(uuid ?? "");
        success(NOTIFICATION_MESSAGE.DELETE_SUCCESS);
        navigate("/project");
      } catch (err) {
        console.log(err);
        failed(NOTIFICATION_MESSAGE.DELETE_FAILED);
      } finally {
        setPageLoading(false);
      }
    });
  };
  return (
    <Spin loading={pageLoading} style={{ width: "100%" }}>
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
              onDetailOpen={handleOpenPurchaseDetail}
              data={purchaseList}
              onTableChange={handlePurchaseTableChange}
              loading={purchaseTableLoading}
            />
          )}
          {puchaseDisplay === "purchase_item" && (
            <PurchaseItemTable
              onDetailOpen={handleOpenPurchaseDetail}
              data={purchaseItemList}
              onTableChange={handlePurchaseItemTableChange}
              loading={purchaseItemTableLoading}
            />
          )}
        </Space>
      </Space>
    </Spin>
  );
};

export default ProjectDetailPage;
