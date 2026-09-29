import { Button, Form, Space, Spin, Typography } from "@arco-design/web-react";
import { IconDelete } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useStoreService from "../store.service";
import type { StoreDetail } from "../store.interface";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import useConfirmation from "../../../core/components/confirmation.services";
import StoreForm from "../components/StoreForm";

const StoreDetailPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { uuid } = useParams();
  const { fetchStoreDetail, deleteStore, updateStore, fetchStoreTags } =
    useStoreService();
  const [originalStoreDetail, setOriginalStoreDetail] = useState<StoreDetail>();
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [form] = Form.useForm<StoreDetail>();

  useEffect(() => {
    setPageLoading(true);
    fetchStoreDetail(uuid ?? "")
      .then((response) => {
        setOriginalStoreDetail(response);
        form.setFieldsValue({ ...response });
      })
      .then(() => {
        fetchStoreTags().then((response) => setTagOptions(response));
      })
      .finally(() => setPageLoading(false));
  }, [fetchStoreDetail, uuid, form]);

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const validateForm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { uuid, ...originalProjectValue } =
      originalStoreDetail as StoreDetail;
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
      const response = await updateStore(
        uuid ?? "",
        form.getFieldsValue() as StoreDetail,
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      setOriginalStoreDetail(response);
    } catch (err) {
      console.log(err);
      form.setFieldsValue({ ...originalStoreDetail });
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    } finally {
      setPageLoading(false);
    }
  };

  const navigate = useNavigate();
  const { deletion } = useConfirmation();
  const handleDeleteProject = () => {
    deletion("Apakah anda yakin menghapus toko ini?", async () => {
      try {
        setPageLoading(true);
        await deleteStore(uuid ?? "");
        success(NOTIFICATION_MESSAGE.DELETE_SUCCESS);
        navigate("/store");
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
            <Typography.Title heading={5}>Detail Toko</Typography.Title>
          </div>
          <Button
            status="danger"
            icon={<IconDelete />}
            onClick={handleDeleteProject}
          >
            Hapus Toko
          </Button>
        </div>
        <StoreForm
          form={form}
          onValuesChange={validateForm}
          saveDisabled={!formIsValid}
          onSave={handleSave}
          tagOptions={tagOptions}
        />
      </Space>
    </Spin>
  );
};

export default StoreDetailPage;
