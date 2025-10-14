import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        thumbnail: true,
        createdAt: true,
        viewCount: true,
        categories: {
          select: { id: true, name: true, slug: true },
        },
        tags: {
          select: { id: true, name: true, slug: true },
        },
        // author: {
        //   select: { name: true, image: true },
        // },

        _count: {
          select: { comments: true, likes: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(blogs);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
