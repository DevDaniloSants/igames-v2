"use client";

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import UpsertPostDialog from "./upsert-post-dialog";

const AddPostButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild aria-hidden="false">
        <Button className="bg-secondary-foreground/65 text-white hover:bg-secondary-foreground/80">
          <PlusIcon size={16} />
          <span>Nova notícia</span>
        </Button>
      </DialogTrigger>
      <UpsertPostDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </Dialog>
  );
};

export default AddPostButton;
