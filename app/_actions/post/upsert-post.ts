"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpsertPost {
  formData: FormData;
  postId?: string;
}

export async function upsertPost({ formData, postId }: UpsertPost) {
  const session = await auth();

  if (session?.user.role !== Role.ADMIN || !session) return;

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File;

  let imageUrl: string | undefined;

  if (postId) {
    const existingPost = await db.post.findUnique({
      where: { id: postId },
      select: { imageUrl: true },
    });
    imageUrl = existingPost?.imageUrl;
  }

  if (image && image.size > 0) {
    const buffer = Buffer.from(await image.arrayBuffer());

    const client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      ACL: "public-read",
      Key: `images/${image.name}`,
      Body: buffer,
    });

    await client.send(command);

    imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/images/${image.name}`;
  }

  if (!imageUrl) return;

  const userId = session.user.id;
  const data = {
    title,
    content,
    categoryId: category,
    imageUrl,
    authorId: userId,
  } as const;

  await db.post.upsert({
    update: data,
    create: data,
    where: { id: postId ?? "" },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/", "layout");
}
