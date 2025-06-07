import { GetPostsDTO } from "@/app/_data-access/post/get-posts";
import { db } from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
): Promise<NextResponse<GetPostsDTO[]>> {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page"));
  const limit = 5;
  const carouselOffset = 3;

  let skip = 0;

  if (page === 1) {
    skip = carouselOffset;
  } else {
    skip = carouselOffset + limit * (page - 1);
  }
  const posts = await db.post.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      author: true,
      comments: true,
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return NextResponse.json(posts);
}
