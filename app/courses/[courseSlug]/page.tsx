"use client";
import MarkdownRenderer from "@/components/markdown-renderer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import React, { useState } from "react";

const SingleCoursesPage = () => {
  const [activeItem, setActiveItem] = useState("Python Home");

  return (
    <div className="mt-12 min-h-[calc(100vh-8.875rem)] md:mt-0 md:min-h-[calc(100vh-19.493rem)]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex">
          <CourseLeftBar
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <CourseMain activeItem={activeItem} setActiveItem={setActiveItem} />
          {/* <CourseRightBar /> */}
        </div>
      </div>
    </div>
  );
};

export default SingleCoursesPage;

const CourseLeftBar = function ({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <aside className="hidden min-w-3xs p-4 lg:block">
      <div>
        <ul className="space-y-2.5">
          {courseData.map((section, i) => (
            <li key={i} className="space-y-0.5">
              <h3 className="text-base font-bold text-neutral-500">
                {section.heading}
              </h3>
              <div className="grid space-y-0.5">
                {section.items.map((item, j) => (
                  <Button
                    key={j}
                    variant={item.title === activeItem ? "blue" : "ghost"}
                    className="justify-start text-left"
                    onClick={() => setActiveItem(item.title)}
                  >
                    {item.title}
                  </Button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const CourseMain = function ({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
}) {
  // Flatten all lessons into one array
  const allLessons = courseData.flatMap((section) => section.items);

  // Find active lesson
  const currentIndex = allLessons.findIndex((c) => c.title === activeItem);
  const course = allLessons[currentIndex];

  // Compute prev/next
  const prevLesson = allLessons[currentIndex - 1];
  const nextLesson = allLessons[currentIndex + 1];

  return (
    <>
      <main className="course-content-main col-span-8 mx-auto w-full py-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="">Python Introduction</h1>
          <div className="flex items-center gap-2.5">
            <Button size={"icon"} variant={"pink"}>
              <Bookmark strokeWidth={2} />
            </Button>
            {prevLesson ? (
              <Button
                size={"icon"}
                variant={"blue"}
                onClick={() => setActiveItem(prevLesson.title)}
              >
                <ArrowLeft strokeWidth={2} />
              </Button>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Button
                size={"icon"}
                variant={"blue"}
                onClick={() => setActiveItem(nextLesson.title)}
              >
                <ArrowRight strokeWidth={2} />
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Render Markdown */}
        <MarkdownRenderer content={course?.content || "_No content found._"} />

        {/* Prev / Next Navigation */}
        <div className="flex items-center justify-between gap-2.5 py-4">
          {prevLesson ? (
            <Button
              variant={"blue"}
              onClick={() => setActiveItem(prevLesson.title)}
            >
              <ArrowLeft strokeWidth={2} className="mr-2" />
              {prevLesson.title}
            </Button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Button
              variant={"blue"}
              onClick={() => setActiveItem(nextLesson.title)}
            >
              {nextLesson.title}
              <ArrowRight strokeWidth={2} className="ml-2" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </main>
    </>
  );
};

const CourseRightBar = function () {
  return (
    <>
      <aside className="hidden py-8 lg:block">
        <h4 className="mb-4 text-xs text-neutral-500">On this page</h4>
        <ul className="space-y-0.5 text-xs text-neutral-500">
          <li>What is Python?</li>
          <li>What can Python do?</li>
          <li>Why Python?</li>
          <li>Example</li>
        </ul>
      </aside>
    </>
  );
};

const courseData = [
  {
    heading: "Python Tutorial",
    items: [
      {
        title: "Python Home",
        slug: "python-home",
        content: `
# Python Home

Welcome to the **Python Tutorial**!  
In this series, you'll learn everything from basic syntax to working with modules and file handling.

> Python is a powerful, easy-to-learn programming language loved by developers worldwide.
        `,
      },
      {
        title: "Python Intro",
        slug: "python-intro",
        content: `
# Python Introduction

## What is Python?

Python is a popular programming language created by **Guido van Rossum** and released in **1991**.

### It is used for:
- Web development (server-side)
- Software development
- Mathematics
- System scripting

## What can Python do?
- Create web applications
- Connect to databases
- Read and modify files
- Handle big data and perform complex math
- Prototype quickly and develop production software

## Why Python?
- Works on Windows, Mac, Linux, Raspberry Pi, etc.
- Has simple, readable syntax
- Runs on an interpreter (great for quick testing)
- Supports multiple paradigms: procedural, OOP, and functional

### Example
\`\`\`python
print("Hello, World!")
\`\`\`

> 💡 **Note:** The latest major version is **Python 3**.  
Python 2 is deprecated but still used in legacy systems.
        `,
      },
      {
        title: "Python Get Started",
        slug: "python-get-started",
        content: `
# Python Get Started

To start coding in Python, install it from [python.org](https://www.python.org/downloads/).

After installation, open your terminal and type:

\`\`\`bash
python --version
\`\`\`

If you see something like \`Python 3.12.0\`, you’re ready to go!

## Running Python
You can:
- Write code in a text editor (e.g. VSCode, Sublime, Atom)
- Use the interactive shell by typing \`python\`
- Save scripts with the \`.py\` extension and run them with \`python script.py\`
        `,
      },
      {
        title: "Python Syntax",
        slug: "python-syntax",
        content: `
# Python Syntax

Python emphasizes **readability** with simple and clean syntax.

### Example:
\`\`\`python
if 5 > 2:
    print("Five is greater than two!")
\`\`\`

### Notes:
- Indentation (whitespace) defines code blocks.
- Python uses new lines to end statements, not semicolons.
- Case-sensitive identifiers.
        `,
      },
    ],
  },
  {
    heading: "File Handling",
    items: [
      {
        title: "Python File Handling",
        slug: "python-file-handling",
        content: `
# Python File Handling

Python lets you work with files to **read**, **write**, and **delete** data.

### Open a File
\`\`\`python
f = open("demo.txt", "r")
print(f.read())
\`\`\`

Modes:
- \`"r"\`: Read
- \`"a"\`: Append
- \`"w"\`: Write
- \`"x"\`: Create
        `,
      },
      {
        title: "Python Read Files",
        slug: "python-read-files",
        content: `
# Python Read Files

Use the \`read()\` method to read file contents.

\`\`\`python
f = open("demo.txt", "r")
print(f.read())
f.close()
\`\`\`

You can also read line by line:

\`\`\`python
for line in open("demo.txt"):
    print(line)
\`\`\`
        `,
      },
    ],
  },
  {
    heading: "Python Modules",
    items: [
      {
        title: "NumPy Tutorial",
        slug: "numpy-tutorial",
        content: `
# NumPy Tutorial

NumPy is a Python library for working with **arrays** and **numerical computations**.

\`\`\`python
import numpy as np
arr = np.array([1, 2, 3, 4])
print(arr)
\`\`\`
        `,
      },
      {
        title: "Pandas Tutorials",
        slug: "pandas-tutorials",
        content: `
# Pandas Tutorial

Pandas is a Python library for **data analysis and manipulation**.

\`\`\`python
import pandas as pd
data = {"Name": ["John", "Anna"], "Age": [28, 24]}
df = pd.DataFrame(data)
print(df)
\`\`\`
        `,
      },
    ],
  },
];
