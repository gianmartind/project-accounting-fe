import { Space, Typography, Divider, Form } from "@arco-design/web-react";
import { type PurchaseDetail } from "../purchase.interface";
import usePurchaseService from "../purchase.service";
import useNotification from "../../../core/notification.services";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.enum";
import PurchaseForm from "../components/PurchaseForm";

const PurchaseNewPage = () => {
  const { insertPurchase } = usePurchaseService();

  const { success, failed } = useNotification();

  const [form] = Form.useForm<PurchaseDetail>();

  const handleSave = async () => {
    try {
      await form.validate();
      const response = await insertPurchase(
        form.getFieldsValue() as PurchaseDetail
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
    } catch (err) {
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
      <Typography.Title heading={5}>Pembelian Baru</Typography.Title>
      <PurchaseForm form={form} onSave={handleSave} />
      <Divider />
    </Space>
  );
};

export default PurchaseNewPage;
