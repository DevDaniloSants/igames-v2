"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { Textarea } from "@/app/_components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { upsertComment } from "@/app/_actions/comments/upsert-comment";
import { Loader2Icon } from "lucide-react";
import { toast } from "react-toastify";

const FormSchema = z.object({
  content: z.string().min(10, {
    message: "O comentário deve ter no mínimo 10 caracteres.",
  }),
});

interface EditCommentFormProps {
  commentId: string;
  defaultContent: string;
  onCancel: () => void;
}

const EditCommentForm = ({
  commentId,
  defaultContent,
  onCancel,
}: EditCommentFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: defaultContent,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await upsertComment({
        content: data.content,
        commentId,
        postId: "",
        userId: "",
      });
      onCancel();
      toast.success("Comentário adicionado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao editar o comentário.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-2 flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Editar comentário..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" />
            )}
            {form.formState.isSubmitting ? "Salvando" : "Salvar alterações"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCommentForm;
