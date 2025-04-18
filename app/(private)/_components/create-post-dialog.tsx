"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Loader2Icon, PlusIcon, UploadCloud } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Category } from "@prisma/client";
import { toast } from "react-toastify";
import { createPost } from "@/app/_actions/post/create-post";

const formSchema = z.object({
  title: z
    .string()
    .min(6, { message: "O título precisa ter no mínimo 6 caracteres" })
    .max(100),
  image: z.any(),
  category: z.string().min(1, { message: "Selecione uma categoria" }),
  content: z
    .string()
    .min(100, { message: "A notícia precisa ter no mínimo 100 caracteres" })
    .max(1000),
});

export type FormSchema = z.infer<typeof formSchema>;

interface CreatePostDialogProps {
  categories: Pick<Category, "id" | "name">[];
}

const CreatePostDialog = ({ categories }: CreatePostDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      image: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files?.[0];

      const imagesTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!imagesTypes.includes(image.type)) {
        toast.error("A imagem deve ser do tipo PNG, JPEG ou JPG");

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
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("image", data.image);

    await createPost(formData);
    setIsOpen(false);
    form.reset();
    setPreviewImage("");
    toast.success("Notícia criada com sucesso!");
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
          setPreviewImage("");
        }
      }}
    >
      <DialogTrigger asChild aria-hidden="false">
        <Button className="bg-secondary-foreground/65 text-white hover:bg-secondary-foreground/80">
          <PlusIcon size={16} />
          <span>Nova notícia</span>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="" className="max-w-[720px] lg:w-[720px]">
        <DialogTitle />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título da notícia" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { ref } }) => (
                <FormItem>
                  <div className="relative min-h-[200px] cursor-pointer rounded-md bg-stone-900 md:h-[300px] lg:h-[350px]">
                    <FormControl>
                      <label className="flex min-h-[200px] w-full flex-col items-center justify-center gap-4 md:h-[300px] lg:h-[350px]">
                        <span className="z-50 scale-100 opacity-30 transition-all duration-300 hover:scale-110 hover:opacity-100">
                          <UploadCloud size={40} className="cursor-pointer" />
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
                        quality={100}
                        className="object-cover"
                      />
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem aria-hidden="false">
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conteúdo</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite o conteúdo da notícia"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
