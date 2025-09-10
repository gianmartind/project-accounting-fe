import {
  Input,
  Grid,
  DatePicker,
  Button,
  type FormInstance,
  Form,
} from "@arco-design/web-react";
import type { ProjectDetail } from "../project.interface";

type Props = {
  form: FormInstance<ProjectDetail>;
  onValuesChange?: () => void;
  saveDisabled: boolean;
  onSave: () => void;
};

const ProjectForm = ({ form, onValuesChange, saveDisabled, onSave }: Props) => {
  return (
    <Form form={form} onValuesChange={onValuesChange}>
      <Form.Item label="Nama Proyek" field="name" rules={[{ required: true }]}>
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
            <Form.Item label="Selesai" field="end_date">
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
        <Button type="primary" onClick={onSave} disabled={saveDisabled}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
