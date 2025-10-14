"use client";

import { Blog } from "@/app/blogs/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function BlogCard({ blog }: { blog: Blog }) {
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

      setLiked(data.liked);
      setLikeCount((prev) => (data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <Card className="corner-squircle relative z-0 gap-2 border-0 p-0 shadow-none">
      <CardHeader className="p-0">
        <div className="mb-0">
          {blog.thumbnail && (
            <Image
              src={blog.thumbnail}
              alt=""
              width={"800"}
              height={"500"}
              className="corner-squircle aspect-video h-auto w-full rounded-lg object-cover object-center"
            />
          )}
        </div>

        <CardTitle className="text-left text-base">
          <Link href={`/blogs/${blog.id}`} className="hover:underline">
            {blog.title}
          </Link>
        </CardTitle>

        <div>
          {(blog.categories.length > 0 || blog.tags.length > 0) && (
            <div className="flex flex-wrap gap-2">
              <Badge
                className="absolute top-2 left-2 bg-white/60 shadow-md backdrop-blur-md"
                variant="secondary"
              >
                {blog.categories[0].name}
              </Badge>

              {blog.tags.slice(0, 3).map((t) => (
                <Badge key={t.id} variant="secondary" className="text-blue-600">
                  #{t.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="px-0 py-2 text-sm">
        <p className="line-clamp-2">{blog.excerpt}</p>
      </CardContent>

      <CardFooter className="flex items-center space-x-2 p-0">
        <Button
          size="sm"
          variant="pink"
          className="flex items-center bg-white text-pink-600 shadow"
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
          className="flex items-center bg-white text-pink-600 shadow"
          asChild
        >
          <Link href={`/blogs/${blog.id}`}>
            <MessageCircle className="h-4 w-4" />
            <span className="text-black">{blog._count.comments}</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default BlogCard;
