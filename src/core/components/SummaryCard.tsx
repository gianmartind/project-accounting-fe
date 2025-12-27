import { Card, Statistic } from "@arco-design/web-react";

type SummaryCardProps = {
  items: Array<{ title: string; value: string | number }>;
};

const SummaryCard = ({ items }: SummaryCardProps) => {
  return (
    <Card style={{ width: "100%" }}>
      {items.map((item) => {
        return (
          <Statistic
            key={`${item.title}-${item.value}`}
            title={item.title}
            value={item.value}
            groupSeparator
            style={{ marginRight: 60 }}
          />
        );
      })}
    </Card>
  );
};

export default SummaryCard;
