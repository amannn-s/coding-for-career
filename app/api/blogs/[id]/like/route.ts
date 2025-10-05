import { type NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/auth";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        blogId_userId: {
          blogId: id,
          userId: user.id,
        },
      },
    });
    console.log(existingLike);

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return NextResponse.json({ liked: false });
    } else {
      // Like
      await prisma.like.create({
        data: {
          blogId: id,
          userId: user.id,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to toggle like" },
      { status: 500 }
    );
  }
}
