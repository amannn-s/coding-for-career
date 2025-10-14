import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

async function getReplies(commentId: string) {
  const replies = await prisma.comment.findMany({
    where: { parentId: commentId },
    include: { author: true },
  });

  // Recursively get replies of replies
  for (const reply of replies) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (reply as any).replies = await getReplies(reply.id);
  }

  return replies;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: blogId } = await params;

  try {
    const comments = await prisma.comment.findMany({
      where: { blogId, parentId: null },
      include: {
        author: { select: { name: true, image: true } },
        replies: {
          include: {
            author: { select: { name: true, image: true } },
          },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    for (const comment of comments) {
      comment.replies = await getReplies(comment.id);
    }

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  console.log("Hello");

  const user = await requireAuth();

  try {
    const { content, blogId, parentId } = await request.json();

    if (!content || !blogId)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const comment = await prisma.comment.create({
      data: {
        content: content,
        blogId: blogId,
        authorId: user.id,
        parentId: parentId || null,
      },
      include: {
        author: { select: { name: true, image: true } },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("Error creating comment: ", error);
    return NextResponse.json(
      { error: "Failed to creating comment" },
      { status: 500 },
    );
  }
}
