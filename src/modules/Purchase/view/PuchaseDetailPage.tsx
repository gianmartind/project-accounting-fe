import { useNavigate, useParams } from "react-router";
import usePurchaseService from "../purchase.service";
import { useEffect, useState } from "react";
import type { PurchaseDetail } from "../purchase.interface";
import { Button, Form, Space, Spin, Typography } from "@arco-design/web-react";
import PurchaseForm from "../components/PurchaseForm";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import { IconDelete } from "@arco-design/web-react/icon";
import useConfirmation from "../../../core/components/confirmation.services";

const PurchaseDetailPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { uuid } = useParams();
  const { fetchPurchaseDetail, updatePurchase, deletePurchase } =
    usePurchaseService();
  const [originalPurchaseDetail, setOriginalPurchaseDetail] =
    useState<PurchaseDetail>();
  const [form] = Form.useForm<PurchaseDetail>();

  useEffect(() => {
    setPageLoading(true);
    fetchPurchaseDetail(uuid ?? "")
      .then((response) => {
        setOriginalPurchaseDetail(response);
        form.setFieldsValue({ ...response });
      })
      .finally(() => setPageLoading(false));
  }, [fetchPurchaseDetail, uuid, form]);

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, ...originalProjectValue } =
      originalPurchaseDetail as PurchaseDetail;
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
      const response = await updatePurchase(
        uuid ?? "",
        form.getFieldsValue() as PurchaseDetail,
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      setOriginalPurchaseDetail(response);
    } catch (err) {
      console.log(err);
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    } finally {
      setPageLoading(false);
    }
  };

  // Delete purchase
  const navigate = useNavigate();
  const { deletion } = useConfirmation();
  const handleDeletePurchase = () => {
    deletion("Apakah anda yakin menghapus pembelian ini?", async () => {
      try {
        setPageLoading(true);
        await deletePurchase(uuid ?? "");
        success(NOTIFICATION_MESSAGE.DELETE_SUCCESS);
        navigate("/purchase");
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
    </Spin>
  );
};

export default PurchaseDetailPage;
