"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
  };
  _count: {
    comments: number;
    likes: number;
  };
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
    <main className="min-h-[calc(100vh-8.875rem)] md:min-h-[calc(100vh-19.493rem)]">
      <div className="mx-auto max-w-5xl px-4 py-8 max-md:pt-20">
        <div className="md:text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-700 mb-8">
            A place to learn by doing, reading.
          </h2>
          {loading ? (
            <div className="text-center">Loading blogs...</div>
          ) : blogs?.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No blogs yet. {isAdmin && "Create your first blog!"}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {blogs?.map((blog) => (
                <div key={blog.id}>
                  <BlogCard key={blog.id} blog={blog} />
                  {/* <h1 className="border">Hello</h1> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogsPage;

function BlogCard({
  blog,
  showFullContent = false,
}: {
  blog: Blog;
  showFullContent?: boolean;
}) {
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
    <Card className="shadow-none gap-1 corner-squircle">
      <CardHeader>
        <div className="mb-2">
          <Image
            src={"/images/blog/blog-thumbnail.png"}
            alt=""
            width={"800"}
            height={"500"}
            className="w-full h-auto aspect-video object-cover rounded-2xl corner-squircle"
          />
        </div>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={blog.author.image || ""} />
            <AvatarFallback>{blog.author.name?.[0] || "A"}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-sm font-medium">{blog.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <CardTitle className="text-xl text-left">
          {showFullContent ? (
            blog.title
          ) : (
            <Link href={`/blogs/${blog.id}`} className="hover:underline">
              {blog.title}
            </Link>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-left">
        {/* <MarkdownRenderer content={content} /> */}
      </CardContent>
      <CardFooter className="flex items-center space-x-4">
        <Button
          variant="ghost"
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
          <span>{likeCount}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-1 bg-neutral-100 text-pink-600"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{blog._count.comments}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
