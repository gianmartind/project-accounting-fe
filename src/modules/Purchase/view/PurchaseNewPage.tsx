import {
  Space,
  Typography,
  Divider,
  Form,
  Select,
  DatePicker,
  Input,
  Grid,
  InputNumber,
  Button,
} from "@arco-design/web-react";
import { UNIT, type PurchaseDetail } from "../purchase.interface";
import { useEffect, useRef, useState } from "react";
import { IconDelete, IconPlus, IconSave } from "@arco-design/web-react/icon";
import usePurchaseService from "../purchase.service";
import useNotification from "../../../core/notification.services";
import { NOTIFICATION_MESSAGE } from "../../../core/notification.enum";
import useProjectService from "../../Project/project.service";
import useStoreService from "../../store/store.service";

const PurchaseNewPage = () => {
  const { insertPurchase, fetchItemTypes } = usePurchaseService();
  const { fetchProjects } = useProjectService();
  const { fetchStoresName } = useStoreService();

  const { success, failed } = useNotification();

  const [form] = Form.useForm<PurchaseDetail>();
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

  const handleSave = async () => {
    try {
      await form.validate();
      const response = await insertPurchase(
        form.getFieldsValue() as PurchaseDetail
      );
      success(NOTIFICATION_MESSAGE.SAVE_SUCCESS);
    } catch (err) {
      failed(NOTIFICATION_MESSAGE.SAVE_FAILED);
    }
  };

  const required = [
    {
      required: true,
      message: "Required",
    },
  ];
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Typography.Title heading={5}>Pembelian Baru</Typography.Title>
      <Form form={form}>
        <Form.Item label="Toko" field="store_name" rules={required}>
          <Select
            allowCreate
            allowClear
            placeholder="Nama Toko"
            options={storesName}
          />
        </Form.Item>
        <Form.Item label="Proyek" field="project_uuid" rules={required}>
          <Select
            allowClear
            placeholder="Nama Proyek"
            options={projectOptions}
          />
        </Form.Item>
        <Form.Item label="Tanggal" field="date" rules={required}>
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
                                rules={required}
                                noStyle
                              >
                                <Input placeholder="Nama" />
                              </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <Form.Item
                                field={`${item.field}.type`}
                                rules={required}
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
                                rules={required}
                                noStyle
                              >
                                <InputNumber placeholder="Jumlah" min={1} />
                              </Form.Item>
                            </Grid.Col>
                            <Grid.Col span={4}>
                              <Form.Item
                                field={`${item.field}.unit`}
                                rules={required}
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
                                rules={required}
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
          <Button type="primary" onClick={handleSave} disabled={false}>
            <IconSave /> Save
          </Button>
        </Form.Item>
      </Form>
      <Divider />
    </Space>
  );
};

export default PurchaseNewPage;
