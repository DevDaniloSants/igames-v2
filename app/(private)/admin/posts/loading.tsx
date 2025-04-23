import AddPostButton from "../../_components/add-post-button";
import {
  AdminHeader,
  AdminHeaderDescription,
  AdminHeaderInfo,
  AdminHeaderTitle,
} from "../../_components/admin-header";

import { DataTable } from "../../_components/data-table";
import { columns } from "./_columns/columns";

const Loading = () => {
  return (
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <AdminHeader>
        <AdminHeaderInfo>
          <AdminHeaderTitle name="Notícias" />
          <AdminHeaderDescription name="Gerencie as notícias do seu blog" />
        </AdminHeaderInfo>
        <AddPostButton />
      </AdminHeader>

      <DataTable columns={columns} data={[]} isLoading={true} />
    </div>
  );
};

export default Loading;
