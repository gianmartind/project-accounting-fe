import {
  Button,
  Card,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Select,
  type FormInstance,
} from "@arco-design/web-react";
import { type PurchaseDetail, type PurchaseItem } from "../purchase.interface";
import { IconDelete, IconPlus, IconSave } from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import useProjectService from "../../Project/project.service";
import useStoreService from "../../store/store.service";
import usePurchaseItemService from "../../purchase_item/purchase-item.service";
import type { ProjectListRecordRequest } from "../../Project/project.interface";
import { FORM_LABEL_COL, FORM_WRAPPER_COL } from "../../../core/form.constant";

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
    const param: ProjectListRecordRequest = {
      page: 0,
      size: 9999,
    };
    fetchProjects(param).then((response) => {
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
      <Form.Item
        label="Toko"
        field="store_name"
        rules={required.current}
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Select
          allowCreate
          allowClear
          placeholder="Nama Toko"
          options={storesName}
        />
      </Form.Item>
      <Form.Item
        label="Proyek"
        field="project_uuid"
        rules={required.current}
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Select allowClear placeholder="Nama Proyek" options={projectOptions} />
      </Form.Item>
      <Form.Item
        label="Tanggal"
        field="purchase_date"
        rules={required.current}
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <DatePicker placeholder="Please select" />
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
      <Form.Item
        label="Item"
        labelCol={FORM_LABEL_COL}
        wrapperCol={FORM_WRAPPER_COL}
      >
        <Form.List field="items">
          {(fields, { add, remove }) => {
            return (
              <Card>
                <div style={{ marginBottom: "2vh" }}>
                  <Grid cols={48} colGap={2} rowGap={4}>
                    <Grid.GridItem span={6}>
                      <div style={centeredTextStyle}>Nama</div>
                    </Grid.GridItem>
                    <Grid.GridItem span={6}>
                      <div style={centeredTextStyle}>Jenis</div>
                    </Grid.GridItem>
                    <Grid.GridItem span={6}>
                      <div style={centeredTextStyle}>Kategori</div>
                    </Grid.GridItem>
                    <Grid.GridItem span={6}>
                      <div style={centeredTextStyle}>Merk</div>
                    </Grid.GridItem>
                    <Grid.GridItem span={3}>
                      <div style={centeredTextStyle}>Jumlah</div>
                    </Grid.GridItem>
                    <Grid.GridItem span={4}>
                      <div style={centeredTextStyle}>Unit</div>
                    </Grid.GridItem>
                    <Grid.GridItem span={8}>
                      <div style={centeredTextStyle}>Harga Satuan</div>
                    </Grid.GridItem>
                    <Grid.GridItem span={8}>
                      <div style={centeredTextStyle}>Harga Total</div>
                    </Grid.GridItem>
                    <Grid.GridItem span={1}>
                      <div style={centeredTextStyle}>
                        <Button
                          type="text"
                          onClick={() => {
                            add();
                          }}
                        >
                          <IconPlus />
                        </Button>
                      </div>
                    </Grid.GridItem>
                  </Grid>
                </div>
                {fields.map((item, index) => {
                  const itemValue = form.getFieldValue("items")[
                    index
                  ] as PurchaseItem;
                  const totalPrice =
                    (itemValue?.amount ?? 0) * (itemValue?.price ?? 0);
                  return (
                    <div key={item.key}>
                      <Form.Item style={{ marginBottom: "1vh" }}>
                        <Grid cols={48} colGap={2} rowGap={4}>
                          <Grid.GridItem span={6}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.name`}
                                rules={required.current}
                                noStyle
                              >
                                <Input placeholder="Nama" />
                              </Form.Item>
                            </div>
                          </Grid.GridItem>
                          <Grid.GridItem span={6}>
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
                          </Grid.GridItem>
                          <Grid.GridItem span={6}>
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
                          </Grid.GridItem>
                          <Grid.GridItem span={6}>
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
                          </Grid.GridItem>
                          <Grid.GridItem span={3}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.amount`}
                                rules={required.current}
                                noStyle
                              >
                                <InputNumber placeholder="Jumlah" min={1} />
                              </Form.Item>
                            </div>
                          </Grid.GridItem>
                          <Grid.GridItem span={4}>
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
                          </Grid.GridItem>
                          <Grid.GridItem span={8}>
                            <div style={centeredTextStyle}>
                              <Form.Item
                                field={`${item.field}.price`}
                                rules={required.current}
                                noStyle
                              >
                                <InputNumber prefix="Rp" placeholder="Satuan" />
                              </Form.Item>
                            </div>
                          </Grid.GridItem>
                          <Grid.GridItem span={8}>
                            <div style={centeredTextStyle}>
                              <InputNumber
                                prefix="Rp"
                                placeholder="Total"
                                value={totalPrice}
                                readOnly
                              />
                            </div>
                          </Grid.GridItem>
                          <Grid.GridItem span={1}>
                            <div style={centeredTextStyle}>
                              <Button
                                icon={<IconDelete />}
                                type="text"
                                status="danger"
                                onClick={() => {
                                  remove(index);
                                }}
                              ></Button>
                            </div>
                          </Grid.GridItem>
                        </Grid>
                      </Form.Item>
                    </div>
                  );
                })}
              </Card>
            );
          }}
        </Form.List>
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

export default PurchaseForm;
