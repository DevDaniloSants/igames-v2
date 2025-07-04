"use client";

import {
  IUpsertComment,
  upsertComment,
} from "@/app/_actions/comments/upsert-comment";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Textarea } from "@/app/_components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface CommentFormProps {
  postId: string;
  userId: string;
}

const FormSchema = z.object({
  content: z.string().min(10, {
    message: "O comentário deve ter no mínimo 10 caracteres.",
  }),
});

const CommentForm = ({ postId, userId }: CommentFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const newComment: IUpsertComment = {
        content: data.content,
        postId: postId,
        userId: userId,
      };

      await upsertComment(newComment);
      toast.success("Comentário adicionado com sucesso!");
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao comentar.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea
                  placeholder="Adicionar comentário"
                  className="placeholder:text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="lg:self-end">
          {form.formState.isSubmitting && (
            <Loader2Icon className="animate-spin" />
          )}
          {form.formState.isSubmitting ? "Salvando" : "Comentar"}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
