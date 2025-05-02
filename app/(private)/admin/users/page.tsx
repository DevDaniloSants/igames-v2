import { columns } from "./_columns/columns";

import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderInfo,
  AdminHeaderTitle,
} from "../../_components/admin-header";
import { DataTable } from "../../_components/data-table";
import AddPostButton from "../../_components/add-post-button";
import { getUsers } from "@/app/_data-access/user/get-uset";

const PostsPage = async () => {
  const users = await getUsers();

  return (
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <AdminHeader>
        <AdminHeaderInfo>
          <AdminHeaderTitle name="Notícias" />
          <AdminHeaderDescription name="Gerencie as notícias do seu blog" />
        </AdminHeaderInfo>
        <AddPostButton />
      </AdminHeader>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default PostsPage;
