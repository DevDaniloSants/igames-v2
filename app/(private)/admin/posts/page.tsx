import { DataTable } from "@/app/_components/data-table";
import { columns } from "./_columns/columns";
import {
  AdminHeader,
  AdminHeaderButton,
  AdminHeaderDescription,
  AdminHeaderInfo,
  AdminHeaderTitle,
} from "@/app/_components/admin-header";
import { PlusIcon } from "lucide-react";
import getPosts from "@/app/_data-access/post/get-posts";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <AdminHeader>
        <AdminHeaderInfo>
          <AdminHeaderTitle name="Notícias" />
          <AdminHeaderDescription name="Gerencie as notícias do seu blog" />
        </AdminHeaderInfo>
        <AdminHeaderButton name="Nova notícia" icon={<PlusIcon size={16} />} />
      </AdminHeader>
      <DataTable columns={columns} data={posts} />
    </div>
  );
};

export default PostsPage;
