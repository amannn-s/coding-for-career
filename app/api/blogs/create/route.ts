import prisma from "@/lib/prisma";
import { requiredAdmin } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await requiredAdmin();

  try {
    const { title, content, published } = await request.json();
    console.log(title, content, published);

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        published: published || false,
        authorId: user.id,
      },
      include: {
        author: {
          select: { name: true, image: true },
        },
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
