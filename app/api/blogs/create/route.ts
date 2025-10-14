import prisma from "@/lib/prisma";
import { requiredAdmin } from "@/lib/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  const user = await requiredAdmin();

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "true";
    const thumbnail = formData.get("thumbnail") as File | null;
    const categoryIds = JSON.parse(
      (formData.get("categoryIds") as string) || "[]",
    );
    const tagIds = JSON.parse((formData.get("tagIds") as string) || "[]");

    // Validate required fields
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 409 },
      );
    }

    // Upload thumbnail to Cloudinary if provided
    let thumbnailUrl: string | null = null;

    if (thumbnail && thumbnail.size > 0) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uploadResponse = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "blogs",
              transformation: [
                { width: 1200, height: 630, crop: "limit" },
                { quality: "auto" },
                { fetch_format: "auto" },
              ],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      thumbnailUrl = uploadResponse.secure_url;
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        thumbnail: thumbnailUrl,
        published,
        authorId: user.id,
        categories: {
          connect: categoryIds.map((id: string) => ({ id })),
        },
        tags: {
          connect: tagIds.map((id: string) => ({ id })),
        },
      },
      include: {
        author: {
          select: { id: true, name: true, image: true },
        },
        categories: {
          select: { id: true, name: true, slug: true },
        },
        tags: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    return NextResponse.json(blog, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Failed to create blog:", error);

    // Handle Prisma unique constraint errors
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A blog with this slug already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
