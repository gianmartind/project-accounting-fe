import { useNavigate, useParams } from "react-router";
import usePurchaseService from "../purchase.service";
import { useEffect, useState } from "react";
import type { PurchaseDetail } from "../purchase.interface";
import { Button, Form, Space, Typography } from "@arco-design/web-react";
import PurchaseForm from "../components/PurchaseForm";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import { IconDelete } from "@arco-design/web-react/icon";
import useConfirmation from "../../../core/components/confirmation.services";

const PurchaseDetailPage = () => {
  const { uuid } = useParams();
  const { fetchPurchaseDetail, updatePurchase, deletePurchase } =
    usePurchaseService();
  const [originalPurchaseDetail, setOriginalPurchaseDetail] =
    useState<PurchaseDetail>();

  useEffect(() => {
    fetchPurchaseDetail(uuid ?? "").then((response) => {
      setOriginalPurchaseDetail(response);
    });
  }, [fetchPurchaseDetail, uuid]);

  const [form] = Form.useForm<PurchaseDetail>();
  useEffect(() => {
    form.setFieldsValue({ ...originalPurchaseDetail });
  }, [form, originalPurchaseDetail]);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      console.log(err);
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    }
  };

  // Delete purchase
  const navigate = useNavigate();
  const { deletion } = useConfirmation();
  const handleDeletePurchase = () => {
    deletion("Apakah anda yakin menghapus pembelian ini?", async () => {
      try {
        await deletePurchase(uuid ?? "");
        success(NOTIFICATION_MESSAGE.DELETE_SUCCESS);
        navigate("/purchase");
      } catch (err) {
        console.log(err);
        failed(NOTIFICATION_MESSAGE.DELETE_FAILED);
      }
    });
  };
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1 }}>
          <Typography.Title heading={5}>Detail Pembelian</Typography.Title>
        </div>
        <Button
          status="danger"
          icon={<IconDelete />}
          onClick={handleDeletePurchase}
        >
          Hapus Pembelian
        </Button>
      </div>
      <PurchaseForm
        form={form}
        onValuesChange={validateForm}
        saveDisabled={!formIsValid}
        onSave={handleSave}
      />
    </Space>
  );
};

export default PurchaseDetailPage;
