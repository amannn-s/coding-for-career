"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import MarkdownRenderer from "@/components/markdown-renderer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

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

function SingleBlog({ blog }: { blog: Blog }) {
  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog._count.likes);
  const [likeLoading, setLikeLoading] = useState(true);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!session?.user?.id) {
        setLikeLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/blogs/${blog.id}/like-status`);
        if (response.ok) {
          const data = await response.json();
          setLiked(data.liked);
        }
      } catch (error) {
        console.error("Failed to fetch like status:", error);
      } finally {
        setLikeLoading(false);
      }
    };

    fetchLikeStatus();
  }, [blog.id, session?.user?.id]);

  const handleLike = async () => {
    if (!session) return;

    try {
      const response = await fetch(`/api/blogs/${blog.id}/like`, {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);

      setLiked(data.liked);
      setLikeCount((prev) => (data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <Card className="corner-squircle gap-1 border-0 bg-transparent p-0 shadow-none">
      <CardHeader className="p-0">
        <div className="mb-2">
          {blog.thumbnail && (
            <Image
              src={blog.thumbnail}
              alt=""
              width={"800"}
              height={"500"}
              className="corner-squircle mb-2 aspect-video h-auto w-full rounded-lg object-cover object-center"
            />
          )}
        </div>

        <CardTitle className="mb-2 text-left text-2xl font-extrabold md:text-3xl lg:text-4xl">
          {blog.title}
        </CardTitle>

        <div className="mb-4 flex items-center space-x-4 border-b-2 border-neutral-200/60 pb-3">
          <div>
            {(blog.categories.length > 0 || blog.tags.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {blog.categories.map((c) => (
                  <Badge
                    key={c.id}
                    variant="secondary"
                    className="bg-pink-50 text-pink-600"
                  >
                    {c.name}
                  </Badge>
                ))}
                {blog.tags.map((t) => (
                  <Badge
                    key={t.id}
                    variant="secondary"
                    className="text-blue-600"
                  >
                    #{t.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="ms-auto flex space-x-4">
            <Button
              variant="pink"
              size="sm"
              className="flex items-center space-x-1 bg-neutral-100 text-pink-600"
              onClick={handleLike}
              disabled={!session}
            >
              <Heart
                className={`h-4 w-4 ${
                  likeLoading
                    ? "animate-pulse"
                    : liked
                      ? "fill-red-500 text-red-500"
                      : ""
                }`}
              />
              <span className="text-black">{likeCount}</span>
            </Button>
            <Button
              variant="pink"
              size="sm"
              className="flex items-center space-x-1 bg-neutral-100 text-pink-600"
              asChild
            >
              <Link href="#single-blog-comment-section">
                <MessageCircle className="h-4 w-4" />
                <span className="text-black">{blog._count.comments}</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="corner-squircle rounded-lg bg-white p-2 text-gray-800 shadow md:p-4">
          <h3 className="mb-2 text-lg font-bold">Quick Summary</h3>
          <p className="text-gray-600">{blog.excerpt}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0 text-left">
        <MarkdownRenderer content={blog.content} />
      </CardContent>
    </Card>
  );
}

export default SingleBlog;
