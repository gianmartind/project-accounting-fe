import { Space, Typography, Form, Spin } from "@arco-design/web-react";
import { type PurchaseDetail } from "../purchase.interface";
import usePurchaseService from "../purchase.service";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import PurchaseForm from "../components/PurchaseForm";
import { useNavigate, useParams } from "react-router";
import { useCallback, useState } from "react";

const PurchaseNewPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { projectUuid } = useParams();
  const { insertPurchase } = usePurchaseService();

  const { success, failed } = useNotification();

  const [form] = Form.useForm<PurchaseDetail>();

  const handlePreAssignProject = useCallback(() => {
    if (!projectUuid) return;
    form.setFieldValue("project_uuid", projectUuid);
  }, [form, projectUuid]);

  const navigate = useNavigate();
  const handleSave = async () => {
    try {
      setPageLoading(true);
      await form.validate();
      const response = await insertPurchase(
        form.getFieldsValue() as PurchaseDetail,
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      navigate(`/purchase/detail/${response.uuid}`);
    } catch (err) {
      console.log(err);
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    } finally {
      setPageLoading(false);
    }
  };

  return (
    <Spin loading={pageLoading} style={{ width: "100%" }}>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Typography.Title heading={5}>Pembelian Baru</Typography.Title>
        <PurchaseForm
          form={form}
          onSave={handleSave}
          onProjectOptionsLoaded={handlePreAssignProject}
        />
      </Space>
    </Spin>
  );
};

export default PurchaseNewPage;
