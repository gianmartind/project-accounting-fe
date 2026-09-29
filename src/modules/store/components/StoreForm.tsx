import {
  Button,
  Form,
  Input,
  Select,
  type FormInstance,
} from "@arco-design/web-react";
import type { StoreDetail } from "../store.interface";
import { useState } from "react";
import { IconSave } from "@arco-design/web-react/icon";
import {
  FORM_LABEL_COL,
  FORM_WRAPPER_COL,
  RULE_REQUIRED,
} from "../../../core/form.constant";

type Props = {
  form: FormInstance<StoreDetail>;
  onValuesChange?: () => void;
  saveDisabled?: boolean;
  onSave: () => void;
  tagOptions: string[];
};
const StoreForm = ({
  form,
  onValuesChange,
  saveDisabled = false,
  onSave,
  tagOptions,
}: Props) => {
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const handleSave = async () => {
    setSaveLoading(true);
    await onSave();
    setSaveLoading(false);
  };

  return (
    <Form form={form} onValuesChange={onValuesChange}>
      <Form.Item
        label="Nama Toko"
        field="name"
        rules={RULE_REQUIRED}
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Input maxLength={32} showWordLimit />
      </Form.Item>
      <Form.Item
        label="Alamat"
        field="address"
        rules={RULE_REQUIRED}
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Input maxLength={255} showWordLimit />
      </Form.Item>
      <Form.Item
        label="Tag(s)"
        field="tags"
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Select mode="multiple" allowClear allowCreate options={tagOptions} />
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

export default StoreForm;
