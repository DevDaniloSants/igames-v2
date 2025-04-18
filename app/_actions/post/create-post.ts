"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const session = await auth();

  if (session?.user.role !== Role.ADMIN || !session) return;

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const category = formData.get("category") as string;
  const image = formData.get("image") as File;

  // upload file to aws s3
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

  const userId = session.user.id;

  await db.post.create({
    data: {
      title,
      content,
      categoryId: category,
      imageUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/images/${image.name}`,
      authorId: userId,
    },
  });

  revalidatePath("/admin/posts");
}
