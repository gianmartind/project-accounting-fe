import { useParams } from "react-router";
import usePurchaseService from "../purchase.service";
import { useEffect, useState } from "react";
import type { PurchaseDetail } from "../purchase.interface";
import { Divider, Form, Space, Typography } from "@arco-design/web-react";
import PurchaseForm from "../components/PurchaseForm";
import useNotification from "../../../core/notification.services";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.enum";

const PurchaseDetailPage = () => {
  const { uuid } = useParams();
  const { fetchPurchaseDetail, updatePurchase } = usePurchaseService();
  const [originalPurchaseDetail, setOriginalPurchaseDetail] =
    useState<PurchaseDetail>();

  useEffect(() => {
    fetchPurchaseDetail(uuid ?? "").then((response) => {
      setOriginalPurchaseDetail(response);
    });
  }, [uuid]);

  const [form] = Form.useForm<PurchaseDetail>();
  useEffect(() => {
    form.setFieldsValue({ ...originalPurchaseDetail });
  }, [originalPurchaseDetail]);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validateForm = () => {
    const { uuid, ...originalProjectValue } =
      originalPurchaseDetail as PurchaseDetail;
    setFormIsValid(
      JSON.stringify(form.getFieldsValue()) !==
        JSON.stringify(originalProjectValue)
    );
  };

  const { success, failed } = useNotification();
  const handleSave = async () => {
    try {
      await form.validate();
      const response = await updatePurchase(
        uuid ?? "",
        form.getFieldsValue() as PurchaseDetail
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      setOriginalPurchaseDetail(response);
    } catch (err) {
      form.setFieldsValue({ ...originalPurchaseDetail });
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    }
  };

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Typography.Title heading={5}>Detail Baru</Typography.Title>
      <PurchaseForm
        form={form}
        onValuesChange={validateForm}
        saveDisabled={!formIsValid}
        onSave={handleSave}
      />
      <Divider />
    </Space>
  );
};

export default PurchaseDetailPage;
