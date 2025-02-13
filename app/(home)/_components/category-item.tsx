import { Card } from "@/app/_components/ui/card";
import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Card className="group flex h-[100px] w-full cursor-pointer items-center p-4">
      <div className="relative h-9 w-9">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:-translate-y-1 group-hover:opacity-55"
        />
      </div>
      <div className="flex w-full flex-col text-center">
        <h3 className="text-lg font-bold uppercase transition-all duration-300 group-hover:text-secondary-foreground">
          {category.name}
        </h3>
        <span className="text-xs transition-all duration-300 group-hover:text-muted-foreground">
          Notícias
        </span>
      </div>
    </Card>
  );
};

export default CategoryItem;
