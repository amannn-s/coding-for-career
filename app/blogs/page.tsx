"use client";

import BlogCard from "@/components/blog-card";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  thumbnail: string | null;
  createdAt: string;
  viewCount: number;
  categories: { id: string; name: string; slug: string }[];
  tags: { id: string; name: string; slug: string }[];
  _count: { comments: number; likes: number };
}

const BlogsPage = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState<Blog[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.log("Failed to fetch blogs: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-2 py-8 max-md:pt-20">
        <section>
          <h2 className="mb-8 text-3xl font-bold text-neutral-800 md:text-center md:text-4xl">
            A place to learn by doing, reading.
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </div>
          ) : blogs?.length === 0 ? (
            <div className="text-muted-foreground text-center">
              No blogs yet. {isAdmin && "Create your first blog!"}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {blogs?.map((blog) => (
                <div key={blog.id}>
                  <BlogCard key={blog.id} blog={blog} />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default BlogsPage;

function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="corner-squircle mb-4 aspect-video rounded-lg bg-gray-200"></div>
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="col-span-2 h-4 rounded bg-gray-200"></div>
        <div className="col-span-1 h-4 rounded bg-gray-200"></div>
      </div>

      <div className="grid gap-2">
        <div className="h-2 rounded bg-gray-200"></div>
        <div className="h-2 rounded bg-gray-200"></div>
        <div className="h-2 rounded bg-gray-200"></div>
        <div className="h-2 rounded bg-gray-200"></div>
      </div>
    </div>
  );
}
