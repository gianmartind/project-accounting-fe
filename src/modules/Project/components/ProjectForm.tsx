import {
  Input,
  Grid,
  DatePicker,
  Button,
  type FormInstance,
  Form,
} from "@arco-design/web-react";
import type { ProjectDetail } from "../project.interface";
import { IconSave } from "@arco-design/web-react/icon";
import { useRef, useState } from "react";

type Props = {
  form: FormInstance<ProjectDetail>;
  onValuesChange?: () => void;
  saveDisabled?: boolean;
  onSave: () => void;
};

const ProjectForm = ({
  form,
  onValuesChange,
  saveDisabled = false,
  onSave,
}: Props) => {
  const required = useRef([
    {
      required: true,
      message: "Required",
    },
  ]);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const handleSave = async () => {
    setSaveLoading(true);
    await onSave();
    setSaveLoading(false);
  };
  return (
    <Form form={form} onValuesChange={onValuesChange}>
      <Form.Item label="Nama Proyek" field="name" rules={required.current}>
        <Input maxLength={32} showWordLimit />
      </Form.Item>
      <Form.Item label="Alamat" field="address" rules={required.current}>
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
              rules={required.current}
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
        <Button
          type="primary"
          loading={saveLoading}
          onClick={handleSave}
          disabled={saveDisabled}
        >
          <IconSave /> Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
