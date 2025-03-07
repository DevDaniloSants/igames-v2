import { columns } from "./_columns/columns";

import { PlusIcon } from "lucide-react";
import getPosts from "@/app/_data-access/post/get-posts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  AdminHeader,
  AdminHeaderButton,
  AdminHeaderDescription,
  AdminHeaderInfo,
  AdminHeaderTitle,
} from "../../_components/admin-header";
import { DataTable } from "../../_components/data-table";

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div className="w-full overflow-hidden xl:max-w-[1200px]">
      <AdminHeader>
        <AdminHeaderInfo>
          <AdminHeaderTitle name="Notícias" />
          <AdminHeaderDescription name="Gerencie as notícias do seu blog" />
        </AdminHeaderInfo>
        <Dialog>
          <DialogTrigger asChild>
            <AdminHeaderButton
              name="Nova notícia"
              icon={<PlusIcon size={16} />}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </AdminHeader>
      <DataTable columns={columns} data={posts} />
    </div>
  );
};

export default PostsPage;
