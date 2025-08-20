import {
    Button,
  DatePicker,
  Form,
  Grid,
  Input,
  Space,
  Typography,
} from "@arco-design/web-react";
import { useParams } from "react-router";

const ProjectDetailPage = () => {
  const { uuid } = useParams();

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Typography.Title heading={3}>Detail Proyek</Typography.Title>
      <Form>
        <Form.Item label="Nama Proyek">
          <Input maxLength={32} showWordLimit />
        </Form.Item>
        <Form.Item label="Alamat">
          <Input.TextArea
            style={{ minHeight: 64 }}
            maxLength={255}
            showWordLimit
          />
        </Form.Item>
        <Form.Item label="Tanggal">
          <Grid.Row>
            <Grid.Col span={12}>
              <Form.Item label="Mulai">
                <DatePicker />
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={12}>
              <Form.Item label="Selesai">
                <DatePicker />
              </Form.Item>
            </Grid.Col>
          </Grid.Row>
        </Form.Item>

        <Form.Item label="Catatan">
          <Input.TextArea
            style={{ minHeight: 80 }}
            maxLength={255}
            showWordLimit
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button type="primary">Save</Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default ProjectDetailPage;
