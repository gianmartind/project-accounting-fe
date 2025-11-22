import { Input } from "@arco-design/web-react";
import type { BaseFilterProps } from "./filter.interface";

const InputSearchFilter = ({
  filterKeys,
  setFilterKeys,
  confirm,
}: BaseFilterProps) => {
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "var(--color-bg-5)",
        boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
      }}
    >
      <Input.Search
        searchButton
        placeholder="Please enter"
        value={filterKeys ? filterKeys[0] : ""}
        onChange={(value) => {
          if (setFilterKeys) setFilterKeys(value ? [value] : []);
        }}
        onSearch={() => {
          if (confirm) confirm();
        }}
      />
    </div>
  );
};

export default InputSearchFilter;
