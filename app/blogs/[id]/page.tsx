"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import MarkdownRenderer from "@/components/markdown-renderer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        console.log(data);

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
      <div className="min-h-[calc(100vh-8.875rem)] md:min-h-[calc(100vh-19.493rem)] bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading blog...</div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-[calc(100vh-8.875rem)] md:min-h-[calc(100vh-19.493rem)] bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8.875rem)] md:min-h-[calc(100vh-19.493rem)] bg-background">
      <header className="mx-auto max-w-5xl px-4">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <BlogCard blog={blog} />
          {/* <CommentSection postId={post.id} /> */}
        </div>
      </main>
    </div>
  );
};

export default SingleBlogPage;

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
      console.log(data);

      setLiked(data.liked);
      setLikeCount((prev) => (data.liked ? prev + 1 : prev - 1));
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  return (
    <Card className="shadow-none gap-1 corner-squircle p-0 border-0">
      <CardHeader className="p-0">
        <div className="mb-2">
          <Image
            src={"/images/blog/blog-thumbnail.png"}
            alt=""
            width={"800"}
            height={"500"}
            className="w-full h-auto aspect-video object-cover rounded-2xl corner-squircle"
          />
        </div>

        <CardTitle className="text-xl md:text-2xl font-extrabold text-left mb-4">
          {blog.title}
        </CardTitle>
        <div className="flex items-center space-x-4 mb-4 border-y-2 py-3">
          <Avatar className="size-12">
            <AvatarImage src={blog.author.image || ""} />
            <AvatarFallback>{blog.author.name?.[0] || "A"}</AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="text-base font-medium">{blog.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="ms-auto flex space-x-4">
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
          </div>
        </div>
      </CardHeader>
      <CardContent className="text-left p-0">
        <MarkdownRenderer content={blog.content} />
      </CardContent>
      <CardFooter className="flex items-center space-x-4 p-0">
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
