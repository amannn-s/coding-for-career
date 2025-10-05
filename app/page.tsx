"use client"; // This component must be a Client Component
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Code, SearchIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function HomePage() {
  const router = useRouter();
  return (
    <main className="flex min-h-[calc(100vh-8.875rem)] items-center md:min-h-[calc(100vh-19.493rem)]">
      <div className="w-full px-7">
        <div className="mb-0 w-full md:flex md:flex-col md:items-center md:justify-center">
          <h1 className="mb-2 w-min font-[family-name:var(--spectral)] text-7xl tracking-tighter text-neutral-900 md:w-max font-medium lg:text-8xl">
            Learn. Build. Repeat.
          </h1>
          <p className="text-xl text-neutral-800">
            A place to learn by doing, reading.
          </p>
          <div className="flex w-sm py-8 md:w-md">
            <InputGroup className="corner-squircle">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton>Search</InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <div className="flex items-center gap-0 md:justify-center">
          <ButtonGroup>
            <Button
              className="rounded-2xl rounded-e-none text-base font-normal bg-blue-100 text-blue-600 hover:bg-blue-200 corner-squircle border-blue-600"
              variant={"outline"}
            >
              Start learning
              <Code className="hidden md:block" />
            </Button>
            <Button
              className="rounded-2xl rounded-s-none text-base font-normal bg-blue-100 text-blue-600 hover:bg-blue-200 corner-squircle border-blue-600"
              variant={"outline"}
            >
              Reading blogs
              <BookOpen className="hidden md:block" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
}
