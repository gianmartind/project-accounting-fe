import {
  Button,
  DatePicker,
  Divider,
  Form,
  Grid,
  Input,
  Space,
  Typography,
} from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useProjectServices from "../project.services";
import type { ProjectDetail } from "../project.interface";
import useNotification from "../../../core/notification.services";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.enum";

const ProjectDetailPage = () => {
  const { uuid } = useParams();
  const { getProjectDetail, updateProject } = useProjectServices();
  const [originalProjectDetail, setOriginalProjectDetail] =
    useState<ProjectDetail>();

  useEffect(() => {
    getProjectDetail(uuid ?? "").then((response) => {
      setOriginalProjectDetail(response);
    });
  }, [uuid]);

  useEffect(() => {
    form.setFieldsValue({ ...originalProjectDetail });
  }, [originalProjectDetail]);

  const [form] = Form.useForm<ProjectDetail>();

  const { success, failed } = useNotification();
  const onSave = async () => {
    try {
      await form.validate();
      const response = updateProject(
        uuid ?? "",
        form.getFieldsValue() as ProjectDetail
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
      return Promise.resolve(response);
    } catch (err) {
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
      console.log("invalid field");
    }
  };

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Typography.Title heading={5}>Detail Proyek</Typography.Title>
      <Form form={form}>
        <Form.Item
          label="Nama Proyek"
          field="name"
          rules={[{ required: true }]}
        >
          <Input maxLength={32} showWordLimit />
        </Form.Item>
        <Form.Item label="Alamat" field="address" rules={[{ required: true }]}>
          <Input.TextArea
            style={{ minHeight: 64 }}
            maxLength={255}
            showWordLimit
          />
        </Form.Item>
        <Form.Item label="Tanggal">
          <Grid.Row>
            <Grid.Col span={12}>
              <Form.Item
                label="Mulai"
                field="start_date"
                rules={[{ required: true }]}
              >
                <DatePicker placeholder="Please select" />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item
                label="Selesai"
                field="end_date"
              >
                <DatePicker placeholder="Please select" />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form.Item>

        <Form.Item label="Catatan" field="notes">
          <Input.TextArea
            style={{ minHeight: 80 }}
            maxLength={255}
            showWordLimit
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary" onClick={onSave}>
            Save
          </Button>
        </Form.Item>
      </Form>
      <Divider />
    </Space>
  );
};

export default ProjectDetailPage;
