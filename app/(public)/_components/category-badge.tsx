import { Badge } from "../../_components/ui/badge";

const CategoryBadge = ({ name }: { name: string }) => {
  return (
    <Badge className="items- flex w-[80px] justify-center rounded-sm">
      {name}
    </Badge>
  );
};

export default CategoryBadge;
