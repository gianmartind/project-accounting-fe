import {
  Button,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Select,
  Space,
  type FormInstance,
} from "@arco-design/web-react";
import { UNIT, type PurchaseDetail } from "../purchase.interface";
import { IconDelete, IconPlus, IconSave } from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import usePurchaseService from "../purchase.service";
import useProjectService from "../../Project/project.service";
import useStoreService from "../../store/store.service";

type Props = {
  form: FormInstance<PurchaseDetail>;
  onValuesChange?: () => void;
  saveDisabled?: boolean;
  onSave: () => void;
};

const PurchaseForm = ({
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
  const { fetchItemTypes } = usePurchaseService();
  const { fetchProjects } = useProjectService();
  const { fetchStoresName } = useStoreService();
  const [storesName, setStoresName] = useState<string[]>();
  const [typesList, setTypesList] = useState<string[]>();
  const [projectOptions, setProjectOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >();
  const unitOptions = useRef(
    Object.entries(UNIT).map(([key, val]) => {
      return {
        label: val,
        value: key,
      };
    })
  );
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const handleSave = async () => {
    setSaveLoading(true);
    await onSave();
    setSaveLoading(false);
  };
  useEffect(() => {
    fetchProjects(0, 9999).then((response) => {
      const optionList = response.map((item) => {
        return {
          label: item.name,
          value: item.uuid,
        };
      });
      setProjectOptions(optionList);
    });
    fetchStoresName().then((response) => {
      setStoresName(response);
    });
    fetchItemTypes().then((response) => {
      setTypesList(response);
    });
  }, []);
  return (
    <Form form={form} onValuesChange={onValuesChange}>
      <Form.Item label="Toko" field="store_name" rules={required.current}>
        <Select
          allowCreate
          allowClear
          placeholder="Nama Toko"
          options={storesName}
        />
      </Form.Item>
      <Form.Item label="Proyek" field="project_uuid" rules={required.current}>
        <Select allowClear placeholder="Nama Proyek" options={projectOptions} />
      </Form.Item>
      <Form.Item label="Tanggal" field="purchase_date" rules={required.current}>
        <DatePicker placeholder="Please select" />
      </Form.Item>
      <Form.Item label="Catatan" field="notes">
        <Input.TextArea
          style={{ minHeight: 80 }}
          maxLength={255}
          showWordLimit
        />
      </Form.Item>
      <Form.Item label="Items">
        <Form.List field="items">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((item, index) => {
                  return (
                    <div key={item.key}>
                      <Form.Item label={`No. ${index}`}>
                        <Grid.Row gutter={8}>
                          <Grid.Col span={4}>
                            <Form.Item
                              field={`${item.field}.name`}
                              rules={required.current}
                              noStyle
                            >
                              <Input placeholder="Nama" />
                            </Form.Item>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Form.Item
                              field={`${item.field}.type`}
                              rules={required.current}
                              noStyle
                            >
                              <Select
                                allowCreate
                                allowClear
                                placeholder="Jenis"
                                options={typesList}
                              />
                            </Form.Item>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <Form.Item
                              field={`${item.field}.amount`}
                              rules={required.current}
                              noStyle
                            >
                              <InputNumber placeholder="Jumlah" min={1} />
                            </Form.Item>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Form.Item
                              field={`${item.field}.unit`}
                              rules={required.current}
                              noStyle
                            >
                              <Select
                                allowCreate
                                allowClear
                                placeholder="Unit"
                                options={unitOptions.current}
                              />
                            </Form.Item>
                          </Grid.Col>
                          <Grid.Col span={6}>
                            <Form.Item
                              field={`${item.field}.price`}
                              rules={required.current}
                              noStyle
                            >
                              <InputNumber prefix="Rp" placeholder="amount" />
                            </Form.Item>
                          </Grid.Col>
                          <Grid.Col span={1}>
                            <Button
                              icon={<IconDelete />}
                              shape="circle"
                              status="danger"
                              onClick={() => {
                                remove(index);
                              }}
                            ></Button>
                          </Grid.Col>
                        </Grid.Row>
                      </Form.Item>
                    </div>
                  );
                })}
                <Space direction="horizontal">
                  <Form.Item wrapperCol={{ offset: 5 }} noStyle>
                    <Button
                      type="text"
                      onClick={() => {
                        add();
                      }}
                    >
                      <IconPlus />
                      Add Item
                    </Button>
                  </Form.Item>
                </Space>
              </div>
            );
          }}
        </Form.List>
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

export default PurchaseForm;
