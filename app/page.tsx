"use client"; // This component must be a Client Component
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Code } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="flex min-h-[calc(100vh-8.875rem)] items-center md:min-h-[calc(100vh-19.493rem)]">
      <div className="w-full px-7">
        <div className="mb-0 w-full md:flex md:flex-col md:items-center md:justify-center">
          <h1 className="mb-2 w-min font-[family-name:var(--spectral)] text-7xl tracking-tighter text-neutral-900 selection:bg-pink-400 md:w-max font-medium lg:text-8xl">
            Learn. Build. Repeat.
          </h1>
          <p className="text-xl text-neutral-800">
            A place to learn by doing, reading.
          </p>
          <div className="flex w-sm py-8 md:w-md">
            <Input
              className="w-full rounded-2xl rounded-e-none corner-squircle border-2 border-neutral-300"
              placeholder="Search..."
            />
            <Button className="rounded-l-none bg-neutral-800 text-white rounded-r-2xl corner-squircle">
              Search
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-0 md:justify-center">
          <Button
            className="rounded-2xl rounded-e-none border border-blue-600 border-e-transparent bg-blue-100 text-base font-normal text-blue-600 hover:bg-blue-200 corner-squircle"
            onClick={() => router.push("/courses")}
          >
            Start learning
            <Code className="hidden md:block" />
          </Button>
          <Button className="rounded-2xl rounded-s-none border border-blue-600 bg-blue-100 text-base font-normal text-blue-600 hover:bg-blue-200 corner-squircle">
            Reading blogs
            <BookOpen className="hidden md:block" />
          </Button>
        </div>
      </div>
    </main>
  );
}
