"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import SingleBlog from "@/components/single-blog";
import CommentSection from "@/components/comment-section";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  thumbnail: string | null;

  categories: {
    id: string;
    name: string;
    slug: string;
  }[];

  tags: {
    id: string;
    name: string;
    slug: string;
  }[];

  author: {
    name: string | null;
    image: string | null;
  };
  authorId: string;
  viewCount: number;
  deletedAt: string | null;
  published: boolean;
  _count: {
    comments: number;
    likes: number;
  };
}

const SingleBlogPage = () => {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchBlog(params.id as string);
    }
  }, [params.id]);

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`);

      if (response.ok) {
        const data = await response.json();

        setBlog(data);
      }
    } catch (error) {
      console.log("Failed to fetch blog: ", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="w-full flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading blog...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="w-full flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Blog not found</h1>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1">
      <header className="mx-auto max-w-5xl px-4">
        <div className="container mx-auto max-w-2xl py-4">
          <Button variant="blue" asChild>
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-4">
          <SingleBlog blog={blog} />
          <div className="flex justify-center gap-4 text-lg font-extrabold text-pink-500">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
          <CommentSection blogId={blog.id} />
        </div>
      </main>
    </div>
  );
};

export default SingleBlogPage;
