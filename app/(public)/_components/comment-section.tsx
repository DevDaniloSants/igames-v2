"use client";

import { Loader2Icon } from "lucide-react";
import CommentForm from "./comment-form";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

import { IGetPostCommentsDTO } from "@/app/_data-access/post/get-post-comments";

import CommentDropdownMenu from "./comment-dropdown-menu";
import { Session } from "next-auth";
import { useState } from "react";

import EditCommentForm from "./edit-comment-form";

interface CommentSectionProps {
  session: Session | null;
  postId: string;
  comments: IGetPostCommentsDTO[];
}

const CommentSection = ({ session, postId, comments }: CommentSectionProps) => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  return (
    <>
      {session?.user && (
        <div className="flex w-full gap-2 py-4">
          <div>
            {session.user.image ? (
              <Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback>
                  <Loader2Icon className="animate-spin" />
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>TD</AvatarFallback>
              </Avatar>
            )}
          </div>
          <CommentForm postId={postId} userId={session.user.id} />
        </div>
      )}
      <div className="mt-6">
        <h2 className="mb-6 text-lg font-semibold">
          Comentários ({comments.length})
        </h2>
        <div className="space-y-6">
          {comments.length > 0 ? (
            <>
              {comments.map((comment) => {
                const isAuthor = session?.user?.id === comment.user.id;
                const isEditing = editingCommentId === comment.id;

                return (
                  <div
                    key={comment.id}
                    className="group flex w-full items-start gap-2 rounded-sm p-4 transition-colors duration-300 hover:cursor-pointer hover:bg-muted/50"
                  >
                    <Avatar>
                      <AvatarImage src={comment.user.image || ""} />
                      <AvatarFallback>TD</AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                      <div className="flex w-full justify-between">
                        {isAuthor ? (
                          <>
                            <h4 className="text-xs transition-colors duration-300 group-hover:text-secondary-foreground">
                              {comment.user.name}

                              <span className="ml-2 text-xs text-muted-foreground">
                                (Você)
                              </span>
                            </h4>
                            <CommentDropdownMenu
                              onEdit={() => setEditingCommentId(comment.id)}
                            />
                          </>
                        ) : (
                          <h4 className="text-xs transition-colors duration-300 group-hover:text-secondary-foreground">
                            {comment.user.name}
                          </h4>
                        )}
                      </div>
                      {isEditing ? (
                        <EditCommentForm
                          commentId={comment.id}
                          defaultContent={comment.content}
                          key={comment.id}
                          onCancel={() => setEditingCommentId(null)}
                        />
                      ) : (
                        <p className="w-full whitespace-normal break-words text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum comentário.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CommentSection;
