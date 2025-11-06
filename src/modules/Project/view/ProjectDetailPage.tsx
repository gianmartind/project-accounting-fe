import { Form, Space, Typography } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useProjectService from "../project.service";
import type { ProjectDetail } from "../project.interface";
import useNotification from "../../../core/notification.services";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.enum";
import ProjectForm from "../components/ProjectForm";
import type {
  PurchaseListRecordRequest,
  PurchaseListRecordResponse,
} from "../../Purchase/purchase.interface";
import usePurchaseService from "../../Purchase/purchase.service";
import PurchaseTable from "../../Purchase/components/PurchaseTable";

const ProjectDetailPage = () => {
  const { uuid } = useParams();
  const { getProjectDetail, updateProject } = useProjectService();
  const [originalProjectDetail, setOriginalProjectDetail] =
    useState<ProjectDetail>();

  useEffect(() => {
    getProjectDetail(uuid ?? "").then((response) => {
      setOriginalProjectDetail(response);
    });
  }, [uuid]);

  const [form] = Form.useForm<ProjectDetail>();
  useEffect(() => {
    form.setFieldsValue({ ...originalProjectDetail });
  }, [originalProjectDetail]);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validateForm = () => {
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
      form.setFieldsValue({ ...originalProjectDetail });
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    }
  };

  // Variables for Purchase Section
  const { fetchPurchaseRecord } = usePurchaseService();

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
    fetchPurchaseRecord(param).then((response) => setPurchaseList(response));
  }, []);

  const navigate = useNavigate();

  const handleOpenPurchaseDetail = (uuid: string) => {
    navigate(`/purchase/detail/${uuid}`);
  };
  return (
    <Space direction="horizontal" align="start" size="medium">
      <Space direction="vertical">
        <Typography.Title heading={5}>Detail Proyek</Typography.Title>
        <ProjectForm
          form={form}
          onValuesChange={validateForm}
          saveDisabled={!formIsValid}
          onSave={handleSave}
        />
      </Space>
      <Space direction="vertical">
        <Typography.Title heading={5}>Pembelian Proyek</Typography.Title>
        <PurchaseTable
          onPuchaseDetailOpen={handleOpenPurchaseDetail}
          data={purchaseList}
          onTableChange={() => {}}
        />
      </Space>
    </Space>
  );
};

export default ProjectDetailPage;
