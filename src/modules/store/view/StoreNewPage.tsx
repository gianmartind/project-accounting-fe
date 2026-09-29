import { Form, Space, Spin, Typography } from "@arco-design/web-react";
import useNotification from "../../../core/notification.service";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.constant";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { StoreDetail } from "../store.interface";
import useStoreService from "../store.service";
import StoreForm from "../components/StoreForm";

const StoreNewPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [form] = Form.useForm<StoreDetail>();
  const [tagOptions, setTagOptions] = useState<string[]>([]);

  const navigate = useNavigate();
  const { insertStore, fetchStoreTags } = useStoreService();
  const { success, failed } = useNotification();

  useEffect(() => {
    setPageLoading(true);
    fetchStoreTags()
      .then((response) => {
        setTagOptions(response);
      })
      .finally(() => {
        setPageLoading(false);
      });
  }, [fetchStoreTags]);
  const handleSave = async () => {
    try {
      setPageLoading(true);
      await form.validate();
      const response = await insertStore(form.getFieldsValue() as StoreDetail);
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      navigate(`/store/detail/${response.uuid}`);
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
        <Typography.Title heading={5}>Toko Baru</Typography.Title>
        <StoreForm
          form={form}
          saveDisabled={false}
          onSave={handleSave}
          tagOptions={tagOptions}
        />
      </Space>
    </Spin>
  );
};

export default StoreNewPage;
