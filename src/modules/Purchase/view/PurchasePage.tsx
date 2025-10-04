import { Space, Button } from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { useNavigate } from "react-router";

const PurchasePage = () => {
  const navigate = useNavigate();

  const handleAddNewPurchase = () => {
    navigate("/purchase/new");
  };
  return (
    <div>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Space style={{ width: "100%" }} direction="vertical" align="end">
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={handleAddNewPurchase}
          >
            Add New Purchase
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default PurchasePage;
