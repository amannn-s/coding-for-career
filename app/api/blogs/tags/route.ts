import prisma from "@/lib/prisma";
import { requiredAdmin } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/tags - Fetch all tags
export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    });

    return NextResponse.json(tags);
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 },
    );
  }
}

// POST /api/tags - Create a new tag
export async function POST(request: NextRequest) {
  try {
    await requiredAdmin(); // Only admins can create tags

    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Tag name is required" },
        { status: 400 },
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if tag with this slug already exists
    const existingTag = await prisma.tag.findUnique({
      where: { slug },
    });

    if (existingTag) {
      return NextResponse.json(
        { error: "A tag with this name already exists" },
        { status: 409 },
      );
    }

    const tag = await prisma.tag.create({
      data: {
        name: name.trim(),
        slug,
      },
    });

    return NextResponse.json(tag, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Failed to create tag:", error);

    // Handle Prisma unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A tag with this name already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 },
    );
  }
}

// DELETE /api/tags - Delete a tag
export async function DELETE(request: NextRequest) {
  try {
    await requiredAdmin();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Tag ID is required" },
        { status: 400 },
      );
    }

    // Check if tag has associated blogs
    const tag = await prisma.tag.findUnique({
      where: { id },
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    if (tag._count.blogs > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete tag. It has ${tag._count.blogs} associated blog(s)`,
        },
        { status: 409 },
      );
    }

    await prisma.tag.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Tag deleted successfully" });
  } catch (error) {
    console.error("Failed to delete tag:", error);
    return NextResponse.json(
      { error: "Failed to delete tag" },
      { status: 500 },
    );
  }
}
