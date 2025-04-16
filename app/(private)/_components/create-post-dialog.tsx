"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { PlusIcon, UploadCloud } from "lucide-react";
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
import { zfd } from "zod-form-data";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  title: z
    .string()
    .min(6, { message: "O título precisa ter no mínimo 6 caracteres" })
    .max(100),
  content: z
    .string()
    .min(100, { message: "A notícia precisa ter no mínimo 100 caracteres" })
    .max(1000),
  image: zfd.file(),
});

const CreatePostDialog = () => {
  const [previewImage, setPreviewImage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];

      const imagesTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!imagesTypes.includes(image.type)) {
        form.setError("image", {
          message: "O arquivo precisa ser uma imagem do tipo PNG, JPEG ou JPG",
        });
        return;
      }

      form.setValue("image", image);
      setPreviewImage(URL.createObjectURL(image));
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("clicou");
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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
                  <div className="n relative min-h-[200px] cursor-pointer rounded-md bg-stone-900 md:h-[300px] lg:h-[350px]">
                    <FormControl>
                      <label className="flex h-full w-full flex-col items-center justify-center gap-4">
                        <span className="z-50 scale-100 opacity-30 transition-all duration-300 hover:scale-110 hover:opacity-100">
                          <UploadCloud size={40} className="cursor-pointer" />
                        </span>
                        <Input
                          type="file"
                          onChange={(e) => {
                            handleFile(e);
                          }}
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
            <Button type="submit">Criar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
