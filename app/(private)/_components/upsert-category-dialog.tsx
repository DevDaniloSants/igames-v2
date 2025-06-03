"use client";

import { upsertCategory } from "@/app/_actions/category/upsert-category";
import { Button } from "@/app/_components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
  Form,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { CameraIcon, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "O nome precisa ter no mínimo 2 caracteres" }),
  description: z
    .string()
    .min(6, { message: "A descrição precisa ter no mínimo 6 caracteres" }),
  image: z.any(),
});

export type FormSchema = z.infer<typeof formSchema>;

interface UpsertCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  };
}

const UpsertCategoryDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
}: UpsertCategoryDialogProps) => {
  const [previewImage, setPreviewImage] = useState<string>(
    defaultValues?.imageUrl ?? "",
  );
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      image: undefined,
    },
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files?.[0];

      const imagesTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!imagesTypes.includes(image.type)) {
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        form.setValue("image", image);
      };

      reader.readAsDataURL(image);
    }
  };

  async function onSubmit(data: FormSchema) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);

    await upsertCategory({ formData, categoryId: defaultValues?.id });
    setIsOpen(false);
    form.reset();
    setPreviewImage("");
    toast.success(`${isEditing ? "Categoria atualizada" : "Categoria criada"}`);
  }

  const isEditing = !!defaultValues;

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setPreviewImage("");
    }
  }, [isOpen, form, isEditing]);

  return (
    <DialogContent>
      <DialogTitle>Nova Categoria</DialogTitle>
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field: { ref } }) => (
              <FormItem className="flex justify-center">
                <div className="relative h-[100px] w-[100px] cursor-pointer overflow-hidden rounded-md bg-stone-900">
                  <FormControl>
                    <label className="relative flex flex-col items-center justify-center gap-4 md:h-[100px] lg:h-[100px]">
                      <span className="z-50 flex h-full w-full scale-100 cursor-pointer items-center justify-center opacity-30 transition-all duration-300 hover:bg-white/20">
                        {isEditing && isLoadingImage && (
                          <Loader2Icon className="h-10 w-10 animate-spin text-zinc-500" />
                        )}
                        {!previewImage && <CameraIcon />}
                      </span>

                      <Input
                        type="file"
                        onChange={handleFile}
                        ref={ref}
                        className="hidden"
                      />
                    </label>
                  </FormControl>
                  <FormMessage />

                  {previewImage && (
                    <Image
                      src={previewImage}
                      alt="Preview da imagem"
                      priority
                      fill
                      sizes="100%"
                      onLoad={() => setIsLoadingImage(false)}
                      quality={100}
                      className="object-contain p-10"
                    />
                  )}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da categoria" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite a descrição da categoria"
                    className="h-10"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            {form.formState.isSubmitting ? (
              <Button disabled>
                <Loader2Icon className="animate-spin" /> Carregando...
              </Button>
            ) : (
              <Button>Criar categoria</Button>
            )}
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertCategoryDialog;
