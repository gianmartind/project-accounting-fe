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
import { type PurchaseDetail, type PurchaseItem } from "../purchase.interface";
import { IconDelete, IconPlus, IconSave } from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import useProjectService from "../../Project/project.service";
import useStoreService from "../../store/store.service";
import usePurchaseItemService from "../../purchase_item/purchase-item.service";

type Props = {
  form: FormInstance<PurchaseDetail>;
  onValuesChange?: () => void;
  onProjectOptionsLoaded?: () => void;
  saveDisabled?: boolean;
  onSave: () => void;
};

const PurchaseForm = ({
  form,
  onValuesChange,
  onProjectOptionsLoaded = () => {},
  saveDisabled = false,
  onSave,
}: Props) => {
  const required = useRef([
    {
      required: true,
      message: "Required",
    },
  ]);
  const {
    fetchItemTypes,
    fetchItemUnits,
    fetchItemBrands,
    fetchItemCategories,
  } = usePurchaseItemService();
  const { fetchProjects } = useProjectService();
  const { fetchStoresName } = useStoreService();
  const [storesName, setStoresName] = useState<string[]>();
  const [typesList, setTypesList] = useState<string[]>();
  const [unitsList, setUnitsList] = useState<string[]>();
  const [categoriesList, setCategoriesList] = useState<string[]>();
  const [brandsList, setBrandsList] = useState<string[]>();
  const [projectOptions, setProjectOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >();
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const handleSave = async () => {
    setSaveLoading(true);
    await onSave();
    setSaveLoading(false);
  };
  useEffect(() => {
    fetchProjects(0, 9999).then((response) => {
      const optionList = response.content.map((item) => {
        return {
          label: item.name,
          value: item.uuid,
        };
      });
      setProjectOptions(optionList);
      onProjectOptionsLoaded();
    });
    fetchStoresName().then((response) => {
      setStoresName(response);
    });
    fetchItemTypes().then((response) => {
      setTypesList(response);
    });
    fetchItemUnits().then((response) => {
      setUnitsList(response);
    });
    fetchItemCategories().then((response) => {
      setCategoriesList(response);
    });
    fetchItemBrands().then((response) => {
      setBrandsList(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchItemTypes, fetchItemUnits, fetchProjects, fetchStoresName]);

  const [, forceUpdate] = useState({});
  const handleFormChange = () => {
    forceUpdate({});
    onValuesChange?.();
  };

  // stylesheet
  const centeredTextStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };
  return (
    <Form form={form} onValuesChange={handleFormChange}>
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
                <div style={{ marginBottom: "2vh" }}>
                  <Grid.Row gutter={1}>
                    <Grid.Col span={3}>
                      <div style={centeredTextStyle}>Nama</div>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <div style={centeredTextStyle}>Jenis</div>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <div style={centeredTextStyle}>Kategori</div>
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <div style={centeredTextStyle}>Merk</div>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <div style={centeredTextStyle}>Jumlah</div>
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <div style={centeredTextStyle}>Unit</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <div style={centeredTextStyle}>Harga Satuan</div>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <div style={centeredTextStyle}>Harga Total</div>
                    </Grid.Col>
                    <Grid.Col span={1}>
                      <div
                        style={centeredTextStyle}
                      ></div>
                    </Grid.Col>
                  </Grid.Row>
                </div>
                {fields.map((item, index) => {
                  const itemValue = form.getFieldValue("items")[index] as PurchaseItem;
                  const totalPrice = (itemValue.amount ?? 0) * (itemValue.price ?? 0);
                  return (
                    <div key={item.key}>
                      <Form.Item style={{ marginBottom: "1vh" }}>
                        <Grid.Row gutter={1}>
                          <Grid.Col span={3}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.name`}
                                rules={required.current}
                                noStyle
                              >
                                <Input placeholder="Nama" />
                              </Form.Item>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <div style={centeredTextStyle}>
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
                            </div>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.category`}
                                rules={required.current}
                                noStyle
                              >
                                <Select
                                  allowCreate
                                  allowClear
                                  placeholder="Kategori"
                                  options={categoriesList}
                                />
                              </Form.Item>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.brand`}
                                rules={required.current}
                                noStyle
                              >
                                <Select
                                  allowCreate
                                  allowClear
                                  placeholder="Merk"
                                  options={brandsList}
                                />
                              </Form.Item>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={1}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.amount`}
                                rules={required.current}
                                noStyle
                              >
                                <InputNumber placeholder="Jumlah" min={1} />
                              </Form.Item>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={2}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.unit`}
                                rules={required.current}
                                noStyle
                              >
                                <Select
                                  allowCreate
                                  allowClear
                                  placeholder="Unit"
                                  options={unitsList}
                                />
                              </Form.Item>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.price`}
                                rules={required.current}
                                noStyle
                              >
                                <InputNumber prefix="Rp" placeholder="Satuan" />
                              </Form.Item>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <div style={centeredTextStyle}>
                              <InputNumber prefix="Rp" placeholder="Total" value={totalPrice} readOnly/>
                            </div>
                          </Grid.Col>
                          <Grid.Col span={1}>
                            <div style={centeredTextStyle}>
                              <Button
                                icon={<IconDelete />}
                                shape="circle"
                                status="danger"
                                onClick={() => {
                                  remove(index);
                                }}
                              ></Button>
                            </div>
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
