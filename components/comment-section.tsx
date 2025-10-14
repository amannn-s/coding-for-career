"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

interface Comment {
  id: string;
  blogId: string;
  content: string;
  createdAt: string;
  author: {
    name: string | null;
    image: string | null;
  };
  authorId: string;
  parentId: string | null;
  replies: [];
}

function CommentSection({ blogId }: { blogId: string }) {
  const { data: session } = useSession();
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/blogs/${blogId}/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment, blogId: blogId }),
      });

      if (response.ok) {
        const comment = await response.json();

        setComments((prev) => [comment, ...prev]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6" id="single-blog-comment-section">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>

      {session && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <Button
            variant={"pink"}
            type="submit"
            disabled={loading || !newComment.trim()}
          >
            {loading ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            blogId={blogId}
            onReply={fetchComments}
            session={session}
          />
        ))}
      </div>
    </section>
  );
}

export default CommentSection;

interface CommentItemProps {
  comment: Comment;
  blogId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  onReply: () => void;
  depth?: number;
}

function CommentItem({
  comment,
  blogId,
  session,
  onReply,
  depth = 0,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const maxDepth = 3; // Maximum nesting level
  const canReply = depth < maxDepth;

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !session) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: replyContent,
          blogId: blogId,
          parentId: comment.id,
        }),
      });

      if (response.ok) {
        setReplyContent("");
        setShowReplyForm(false);
        onReply(); // Refetch comments
      }
    } catch (error) {
      console.error("Failed to post reply:", error);
    } finally {
      setLoading(false);
    }
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div
      className={`${depth > 0 ? "mt-4 ml-12 border-l-2 border-blue-400/80" : ""}`}
    >
      <Card className="border-0 p-2 py-1 shadow-none">
        <CardContent className="p-2">
          <div className="flex items-start space-x-3">
            <Avatar className="h-10 w-10 shadow">
              <AvatarImage src={comment.author.image || ""} />
              <AvatarFallback>{comment.author.name?.[0] || "A"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">{comment.author.name}</p>
                <p className="text-muted-foreground text-xs">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>

              <div className="mt-3 flex items-center gap-4">
                {session && canReply && (
                  <Button
                    variant="pink"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => setShowReplyForm(!showReplyForm)}
                  >
                    <MessageCircle className="mr-1 h-3 w-3" />
                    Reply
                  </Button>
                )}

                {hasReplies && (
                  <Button
                    variant="blue"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => setShowReplies(!showReplies)}
                  >
                    {showReplies ? (
                      <ChevronUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ChevronDown className="mr-1 h-3 w-3" />
                    )}
                    {comment.replies.length}{" "}
                    {comment.replies.length ? "reply" : "replies"}
                  </Button>
                )}
              </div>

              {showReplyForm && (
                <form onSubmit={handleReplySubmit} className="mt-4 space-y-3">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={2}
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      size="sm"
                      disabled={loading || !replyContent.trim()}
                    >
                      {loading ? "Posting..." : "Post Reply"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowReplyForm(false);
                        setReplyContent("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Render nested replies */}
      {hasReplies && showReplies && (
        <div className="space-y-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {comment.replies.map((reply: any) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              blogId={blogId}
              session={session}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
