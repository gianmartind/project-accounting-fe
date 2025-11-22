import { Button, Radio, Space } from "@arco-design/web-react";
import type { BaseFilterProps } from "./filter.interface";

type RadioFilterProps = BaseFilterProps & {
  options: string[];
};

const RadioFilter = ({
  options,
  filterKeys,
  setFilterKeys,
  confirm,
}: RadioFilterProps) => {
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
        <Radio.Group
          value={filterKeys ? filterKeys[0] : ""}
          direction="vertical"
          onChange={(value) => {
            if (setFilterKeys) setFilterKeys(value ? [value] : []);
          }}
        >
          {(options as string[]).map((name) => (
            <Radio key={name} value={name}>
              {name}
            </Radio>
          ))}
        </Radio.Group>
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

export default RadioFilter;
