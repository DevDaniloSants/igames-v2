import { columns } from "./_columns/columns";

import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderInfo,
  AdminHeaderTitle,
} from "../../_components/admin-header";
import { DataTable } from "../../_components/data-table";

import { getCategories } from "@/app/_data-access/category/get-categories";
import AddCategoryButton from "../../_components/add-category-button";

const PostsPage = async () => {
  const posts = await getCategories();

  return (
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <AdminHeader>
        <AdminHeaderInfo>
          <AdminHeaderTitle name="Categorias" />
          <AdminHeaderDescription name="Gerencie as categorias do sistema" />
        </AdminHeaderInfo>
        <AddCategoryButton />
      </AdminHeader>
      <DataTable columns={columns} data={posts} />
    </div>
  );
};

export default PostsPage;
