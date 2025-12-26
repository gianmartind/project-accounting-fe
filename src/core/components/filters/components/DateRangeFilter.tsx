import { Button, DatePicker, Space } from "@arco-design/web-react";
import type { BaseFilterProps } from "../interface/filter.interface";

const DateRangeFilter = ({
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
        <DatePicker.RangePicker
          value={filterKeys}
          onChange={(value) => {
            if (setFilterKeys) setFilterKeys(value ? value : []);
          }}
        />
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

export default DateRangeFilter;
