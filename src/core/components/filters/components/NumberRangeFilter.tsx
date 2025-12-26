import { Button, InputNumber, Space } from "@arco-design/web-react";
import type { BaseFilterProps } from "../interface/filter.interface";

const NumberRangeFilter = ({
  filterKeys,
  setFilterKeys,
  confirm,
}: BaseFilterProps) => {
  return (
    <Space
      direction="vertical"
      style={{
        padding: 12,
        width: "15vw",
        backgroundColor: "var(--color-bg-5)",
        boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        style={{
          maxHeight: "25vh",
          overflowY: "auto",
        }}
      >
        <Space direction="horizontal" style={{ width: "100%" }}>
          <InputNumber
            placeholder="Min"
            value={filterKeys ? filterKeys[0] : ""}
            onChange={(value) => {
              if (setFilterKeys && filterKeys)
                setFilterKeys(value ? [String(value), filterKeys[1]] : []);
            }}
          />
          -
          <InputNumber
            placeholder="Max"
            value={filterKeys ? filterKeys[1] : ""}
            onChange={(value) => {
              if (setFilterKeys && filterKeys)
                setFilterKeys(value ? [filterKeys[0], String(value)] : []);
            }}
          />
        </Space>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Space direction="horizontal">
          <Button
            type="secondary"
            size="mini"
            onClick={() => {
              if (setFilterKeys) setFilterKeys([]);
            }}
          >
            Clear
          </Button>
          <Button
            type="primary"
            size="mini"
            onClick={() => {
              if (confirm) confirm();
            }}
          >
            Apply
          </Button>
        </Space>
      </div>
    </Space>
  );
};

export default NumberRangeFilter;
