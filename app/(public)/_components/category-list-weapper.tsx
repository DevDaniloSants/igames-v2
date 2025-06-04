import { getCategories } from "@/app/_data-access/category/get-categories";
import CategoryList from "./category-list";

const CategoryListWrapper = async () => {
  const categories = await getCategories();
  return <CategoryList categories={categories} />;
};

export default CategoryListWrapper;
