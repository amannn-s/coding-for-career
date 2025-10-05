import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Bookmark } from "lucide-react";
import React from "react";

const SingleCoursesPage = () => {
  return (
    <div className="mt-12 min-h-[calc(100vh-8.875rem)] md:mt-0 md:min-h-[calc(100vh-19.493rem)]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex">
          <CourseLeftBar />
          <CourseMain />
          <CourseRightBar />
        </div>
      </div>
    </div>
  );
};

export default SingleCoursesPage;

const CourseLeftBar = function () {
  const activeItem = "Python Intro"; // you can pass this as a prop

  return (
    <aside className="hidden min-w-3xs p-4 lg:block">
      <div>
        <ul className="space-y-2.5">
          {sidebarData.map((section, i) => (
            <li key={i} className="space-y-0.5">
              <h3 className="text-base font-bold text-neutral-500">
                {section.heading}
              </h3>
              <ul className="space-y-0.5">
                {section.items.map((item, j) => (
                  <li
                    key={j}
                    className={`rounded px-1.5 ${
                      item === activeItem
                        ? "bg-blue-400 font-medium text-white"
                        : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

const CourseMain = function () {
  return (
    <>
      <main className="course-content-main col-span-8 mx-auto max-w-2xl py-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="">Python Introduction</h1>
          <div className="flex items-center gap-2.5">
            <Button
              size={"icon"}
              variant={"secondary"}
              className="text-pink-500"
            >
              <Bookmark strokeWidth={2} />
            </Button>
            <Button
              size={"icon"}
              variant={"secondary"}
              className="text-blue-500"
            >
              <ArrowLeft strokeWidth={2} />
            </Button>
            <Button
              size={"icon"}
              variant={"secondary"}
              className="text-blue-500"
            >
              <ArrowRight strokeWidth={2} />
            </Button>
          </div>
        </div>

        <section>
          <h2>What is Python?</h2>
          <p>
            Python is a popular programming language. It was created by Guido
            van Rossum, and released in 1991.
          </p>

          <p>It is used for:</p>
          <ul>
            <li>web development (server-side),</li>
            <li>software development,</li>
            <li>mathematics,</li>
            <li>system scripting.</li>
          </ul>
        </section>

        <section>
          <h2>What can Python do?</h2>
          <ul>
            <li>Python can be used on a server to create web applications.</li>
            <li>Python can be used alongside software to create workflows.</li>
            <li>
              Python can connect to database systems. It can also read and
              modify files.
            </li>
            <li>
              Python can be used to handle big data and perform complex
              mathematics.
            </li>
            <li>
              Python can be used for rapid prototyping, or for production-ready
              software development.
            </li>
          </ul>
        </section>

        <section>
          <h2>Why Python?</h2>
          <ul>
            <li>
              Python works on different platforms (Windows, Mac, Linux,
              Raspberry Pi, etc).
            </li>
            <li>
              Python has a simple syntax similar to the English language.{" "}
            </li>
            <li>
              Python has syntax that allows developers to write programs with
              fewer lines than some other programming languages.
            </li>

            <li>
              Python runs on an interpreter system, meaning that code can be
              executed as soon as it is written. This means that prototyping can
              be very quick.
            </li>
            <li>
              Python can be treated in a procedural way, an object-oriented way
              or a functional way.
            </li>
          </ul>

          <h3>Good to know</h3>
          <ul>
            <li>
              The most recent major version of Python is Python 3, which we
              shall be using in this tutorial. However, Python 2, although not
              being updated with anything other than security updates, is still
              quite popular.
            </li>
            <li>
              In this tutorial Python will be written in a text editor. It is
              possible to write Python in an Integrated Development Environment,
              such as Thonny, Pycharm, Netbeans or Eclipse which are
              particularly useful when managing larger collections of Python
              files.
            </li>
          </ul>

          <h3>Python Syntax compared to other programming languages</h3>
          <ul>
            <li>
              Python was designed for readability, and has some similarities to
              the English language with influence from mathematics.
            </li>
            <li>
              Python uses new lines to complete a command, as opposed to other
              programming languages which often use semicolons or parentheses.
            </li>
            <li>
              Python relies on indentation, using whitespace, to define scope;
              such as the scope of loops, functions and classes. Other
              programming languages often use curly-brackets for this purpose.
            </li>
          </ul>
        </section>

        <section>
          <h2>Example</h2>
          <code>print(&quot;Hello, World!&quot;)</code>
        </section>

        <div className="flex items-center justify-between gap-2.5 py-4">
          <Button className="bg-white text-blue-500">
            <ArrowLeft strokeWidth={2} />
            Python Home
          </Button>
          <Button className="bg-white text-blue-500">
            <ArrowRight strokeWidth={2} />
            Python Get Started
          </Button>
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

const sidebarData = [
  {
    heading: "Python Tutorial",
    items: [
      "Python Home",
      "Python Intro",
      "Python Get Started",
      "Python Syntax",
      "Python Comments",
      "Python Variables",
      "Python Data Types",
      "Python Numbers",
      "Python Casting",
      "Python String",
      "Python Booleans",
      "Python Operators",
      "Python List",
      "Python Tuples",
      "Python Sets",
      "Python Dictionaries",
      "Python If...Else",
      "Python Match",
      "Python While Loops",
    ],
  },
  {
    heading: "File Handling",
    items: [
      "Python File Handling",
      "Python Read Files",
      "Python Write/Create Files",
      "Python Delete Files",
    ],
  },
  {
    heading: "Python Modules",
    items: [
      "NumPy Tutorial",
      "Pandas Tutorials",
      "SciPy Tutorial",
      "Django Tutorial",
    ],
  },
];
