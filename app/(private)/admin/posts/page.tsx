import { columns } from "./_columns/columns";

import getPosts from "@/app/_data-access/post/get-posts";
import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderInfo,
  AdminHeaderTitle,
} from "../../_components/admin-header";
import { DataTable } from "../../_components/data-table";
import AddPostButton from "../../_components/add-post-button";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <AdminHeader>
        <AdminHeaderInfo>
          <AdminHeaderTitle name="Notícias" />
          <AdminHeaderDescription name="Gerencie as notícias do seu blog" />
        </AdminHeaderInfo>
        <AddPostButton />
      </AdminHeader>
      <DataTable columns={columns} data={posts} />
    </div>
  );
};

export default PostsPage;
