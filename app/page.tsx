import { Button } from "@/components/ui/button";
import { BookOpen, Code, SearchIcon } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center py-6">
      <div className="w-full px-7">
        <div className="mb-0 w-full md:flex md:flex-col md:items-center md:justify-center">
          <h1 className="mb-2 w-min font-[family-name:var(--spectral)] text-7xl font-semibold tracking-tighter text-neutral-700 md:w-max lg:text-8xl">
            Learn. Build. Repeat.
          </h1>
          <p className="text-xl text-neutral-800">
            A place to learn by doing, reading.
          </p>
          <div className="flex py-8 md:w-md">
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
              className="corner-squircle rounded-xl rounded-e-none border-blue-600 bg-blue-100 text-base font-normal text-blue-600 hover:bg-blue-200"
              variant={"outline"}
              asChild
            >
              <Link href={"/courses"}>
                Start learning
                <Code />
              </Link>
            </Button>
            <Button
              className="corner-squircle rounded-xl rounded-s-none border-blue-600 bg-blue-100 text-base font-normal text-blue-600 hover:bg-blue-200"
              variant={"outline"}
              asChild
            >
              <Link href={"/blogs"}>
                Reading blogs
                <BookOpen />
              </Link>
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
}
