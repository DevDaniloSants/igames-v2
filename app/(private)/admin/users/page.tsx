import { columns } from "./_columns/columns";

import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderInfo,
  AdminHeaderTitle,
} from "../../_components/admin-header";
import { DataTable } from "../../_components/data-table";

import { getUsers } from "@/app/_data-access/user/get-user";

const PostsPage = async () => {
  const users = await getUsers();

  return (
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <AdminHeader>
        <AdminHeaderInfo>
          <AdminHeaderTitle name="Usuários" />
          <AdminHeaderDescription name="Gerencie os usuários do sistema." />
        </AdminHeaderInfo>
      </AdminHeader>
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default PostsPage;
