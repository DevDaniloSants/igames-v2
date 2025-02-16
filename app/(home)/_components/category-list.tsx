"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/app/_components/ui/carousel";

import CategoryItem from "./category-item";
import { Category } from "@prisma/client";
import { useIsMobile } from "@/app/_hooks/use-mobile";

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  const isMobile = useIsMobile();

  return isMobile ? (
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
  ) : (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
export default CategoryList;
