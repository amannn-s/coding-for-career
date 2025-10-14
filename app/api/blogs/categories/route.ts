import prisma from "@/lib/prisma";
import { requiredAdmin } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories - Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// POST /api/categories - Create a new category
export async function POST(request: NextRequest) {
  try {
    await requiredAdmin(); // Only admins can create categories

    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 },
      );
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if category with this slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 },
      );
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug,
      },
    });

    return NextResponse.json(category, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Failed to create category:", error);

    // Handle Prisma unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A category with this name already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}

// DELETE /api/categories - Delete a category
export async function DELETE(request: NextRequest) {
  try {
    await requiredAdmin();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 },
      );
    }

    // Check if category has associated blogs
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { blogs: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    if (category._count.blogs > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete category. It has ${category._count.blogs} associated blog(s)`,
        },
        { status: 409 },
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Failed to delete category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
