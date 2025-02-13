import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/_components/ui/carousel";

import CategoryItem from "./category-item";
import { Category } from "@prisma/client";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  if (!categories) return null;

  return (
    <Carousel className="max-w-1200px w-full">
      <CarouselContent>
        {categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="cursor-grabbing md:basis-1/2 md:cursor-pointer lg:basis-1/4 lg:cursor-default"
          >
            <CategoryItem category={category} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CategoryList;
