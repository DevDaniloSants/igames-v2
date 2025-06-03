"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@/auth";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpsertCategory {
  formData: FormData;
  categoryId?: string;
}

export const upsertCategory = async ({
  formData,
  categoryId,
}: UpsertCategory) => {
  const session = await auth();

  if (session?.user.role !== Role.ADMIN || !session) return;

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File;

  let imageUrl: string | undefined;

  if (categoryId) {
    const existingCategory = await db.category.findUnique({
      where: { id: categoryId },
      select: { imageUrl: true },
    });

    imageUrl = existingCategory?.imageUrl;
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

  const data = {
    name,
    description,
    imageUrl,
  };

  await db.category.upsert({
    update: data,
    create: data,
    where: { id: categoryId ?? "" },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/", "layout");
};
