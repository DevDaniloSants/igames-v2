import { columns } from "./_columns/columns";

import getPosts from "@/app/_data-access/post/get-posts";
import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderInfo,
  AdminHeaderTitle,
} from "../../_components/admin-header";
import { DataTable } from "../../_components/data-table";
import CreatePostDialog from "../../_components/create-post-dialog";
import { getCategories } from "@/app/_data-access/category/get-categories";

const PostsPage = async () => {
  const posts = await getPosts();
  const categories = await getCategories();

  return (
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <AdminHeader>
        <AdminHeaderInfo>
          <AdminHeaderTitle name="Notícias" />
          <AdminHeaderDescription name="Gerencie as notícias do seu blog" />
        </AdminHeaderInfo>
        <CreatePostDialog categories={categories} />
      </AdminHeader>
      <DataTable columns={columns} data={posts} />
    </div>
  );
};

export default PostsPage;
