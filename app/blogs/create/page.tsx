"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, FileSpreadsheet } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import MarkdownRenderer from "@/components/markdown-renderer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MarkdownCheatSheet from "@/components/markdown-cheat-sheet";
import { Badge } from "@/components/ui/badge";

// Types for categories and tags
type Category = { id: string; name: string; slug: string };
type Tag = { id: string; name: string; slug: string };

export default function CreatePostPage() {
  const router = useRouter();
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    [],
  );
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [newTag, setNewTag] = useState("");

  // Auto-generate slug from title
  useEffect(() => {
    const generatedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setSlug(generatedSlug);
  }, [title]);

  // Fetch categories and tags on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          fetch("/api/blogs/categories"),
          fetch("/api/blogs/tags"),
        ]);

        if (categoriesRes.ok) {
          const categories = await categoriesRes.json();
          setAvailableCategories(categories);
        }

        if (tagsRes.ok) {
          const tags = await tagsRes.json();
          setAvailableTags(tags);
        }
      } catch (error) {
        console.error("Failed to fetch categories/tags:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const response = await fetch("/api/blogs/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        const category = await response.json();
        setAvailableCategories([...availableCategories, category]);
        setSelectedCategories([...selectedCategories, category.id]);
        setNewCategory("");
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    try {
      const response = await fetch("/api/blogs/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newTag }),
      });

      if (response.ok) {
        const tag = await response.json();
        setAvailableTags([...availableTags, tag]);
        setSelectedTags([...selectedTags, tag.id]);
        setNewTag("");
      }
    } catch (error) {
      console.error("Failed to create tag:", error);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId],
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("published", String(published));
      formData.append("categoryIds", JSON.stringify(selectedCategories));
      formData.append("tagIds", JSON.stringify(selectedTags));
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const response = await fetch("/api/blogs/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/blogs");
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <div className="space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="blue">
                    <FileSpreadsheet className="h-4 w-4" />
                    Cheat sheet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Markdown Cheat Sheet</DialogTitle>
                    <DialogDescription>
                      Quick reference guide for all Markdown syntax.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="h-[70vh] !overflow-y-scroll">
                    <MarkdownCheatSheet />
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="pink" onClick={() => setPreview(!preview)}>
                <Eye className="h-4 w-4" />
                {preview ? "Edit" : "Preview"}
              </Button>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 ${preview && "gap-8 lg:grid-cols-2"}`}
          >
            <Card className="corner-squircle border-0 bg-white">
              <CardHeader>
                <CardTitle>Write Post</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter post title..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="auto-generated-from-title"
                      required
                    />
                    <p className="text-muted-foreground text-xs">
                      URL-friendly version of the title
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Enter post excerpt..."
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail</Label>
                    <Input
                      id="thumbnail"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setThumbnail(e.target.files?.[0] || null)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {availableCategories.map((category) => (
                        <Badge
                          key={category.id}
                          variant={
                            selectedCategories.includes(category.id)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleCategory(category.id)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Add new category..."
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), handleAddCategory())
                        }
                      />
                      <Button
                        type="button"
                        onClick={handleAddCategory}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={
                            selectedTags.includes(tag.id)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag.id)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add new tag..."
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), handleAddTag())
                        }
                      />
                      <Button
                        type="button"
                        onClick={handleAddTag}
                        variant="outline"
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Content (Markdown)</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your post in markdown..."
                      rows={20}
                      required
                      className="min-h-80"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={published}
                      onCheckedChange={setPublished}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>

                  <Button
                    type="submit"
                    variant="blue"
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? "Creating..." : "Create Post"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {preview && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">
                      {title || "Post Title"}
                    </h2>
                    <p className="text-muted-foreground">
                      {excerpt || "Post excerpt will appear here..."}
                    </p>
                    {(selectedCategories.length > 0 ||
                      selectedTags.length > 0) && (
                      <div className="flex flex-wrap gap-2">
                        {availableCategories
                          .filter((c) => selectedCategories.includes(c.id))
                          .map((c) => (
                            <Badge key={c.id} variant="secondary">
                              {c.name}
                            </Badge>
                          ))}
                        {availableTags
                          .filter((t) => selectedTags.includes(t.id))
                          .map((t) => (
                            <Badge key={t.id} variant="outline">
                              {t.name}
                            </Badge>
                          ))}
                      </div>
                    )}
                    <MarkdownRenderer
                      content={content || "Your content will appear here..."}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
