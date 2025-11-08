import { Input } from "@arco-design/web-react";

type Props = {
  filterKeys: string[];
  setFilterKeys: (keys: string[]) => void;
  confirm: () => void;
};

const InputSearchFilter = ({ filterKeys, setFilterKeys, confirm }: Props) => {
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
        value={filterKeys[0] || ""}
        onChange={(value) => {
          setFilterKeys(value ? [value] : []);
        }}
        onSearch={() => {
          confirm();
        }}
      />
    </div>
  );
};

export default InputSearchFilter;
