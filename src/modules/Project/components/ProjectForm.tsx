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
import { FORM_LABEL_COL, FORM_WRAPPER_COL } from "../../../core/form.constant";

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
      <Form.Item
        label="Nama Proyek"
        field="name"
        rules={required.current}
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Input maxLength={32} showWordLimit />
      </Form.Item>
      <Form.Item
        label="Pemilik"
        field="owner"
        rules={required.current}
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Input maxLength={32} showWordLimit />
      </Form.Item>
      <Form.Item
        label="Lokasi"
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Grid.Row gutter={12}>
          <Grid.Col span={6}>
            <Form.Item label="Kota" field="city" rules={required.current}>
              <Input maxLength={32} showWordLimit />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={18}>
            <Form.Item label="Alamat" field="address" rules={required.current}>
              <Input.TextArea
                style={{ minHeight: 64 }}
                maxLength={255}
                showWordLimit
              />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
      </Form.Item>
      <Form.Item
        label="Tanggal"
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Grid.Row gutter={12}>
          <Grid.Col span={12}>
            <Form.Item
              label="Mulai"
              field="start_date"
              rules={required.current}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Please select"
              />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={12}>
            <Form.Item label="Selesai" field="end_date">
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Please select"
              />
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
      </Form.Item>

      <Form.Item
        label="Catatan"
        field="notes"
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Input.TextArea
          style={{ minHeight: 80 }}
          maxLength={255}
          showWordLimit
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: FORM_LABEL_COL.span }}>
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
