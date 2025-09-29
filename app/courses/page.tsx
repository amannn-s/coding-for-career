"use client"; // This component must be a Client Component
import { useRouter } from "next/navigation";
import React from "react";
import {
  BitRiseIcon,
  CloudWaysIcon,
  CppIcon,
  CSSIcon,
  DataIcon,
  GenerativeAiIcon,
  GoogleAnalyticsIcons,
  HTMLIcon,
  ICloudIcon,
  JavaIcon,
  JSIcon,
  LineageOsIcon,
  MongoDB,
  MySqlIcon,
  PythonIcon,
  ReactIcon,
  SoundCloudIcon,
} from "../../components/icons";

const CoursesPage = () => {
  const router = useRouter();

  return (
    <main className="min-h-[calc(100vh-8.875rem)] md:min-h-[calc(100vh-19.493rem)]">
      <div className="mx-auto max-w-5xl px-4 py-18 space-y-12">
        {navigationItems.map((item, index) => {
          const { title, items } = item;
          return (
            <div key={index}>
              <h2 className="text-xl md:text-2xl font-bold mb-8">{title}</h2>

              <div className="grid grid-cols-2: md:grid-cols-3 gap-4">
                {items.map((subItem) => {
                  const { icon, label, description, active, href } = subItem;
                  return (
                    <article
                      key={label}
                      className="px-4 py-6 rounded-2xl corner-squircle flex gap-4 border-dashed border-2 hover:shadow-xl hover:shadow-neutral-100 transition-all cursor-pointer"
                      onClick={() => router.push(`${href}`)}
                    >
                      <div className="aspect-square size-20">
                        <span
                          className={`  ${
                            active ? "fill-neutral-800" : "fill-neutral-500"
                          }`}
                        >
                          {icon}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-lg md:text-xl font-semibold">
                          {label}
                        </h4>
                        <p className="text-sm text-neutral-600">
                          {description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default CoursesPage;

const navigationItems = [
  {
    title: "Programming",
    items: [
      {
        icon: <PythonIcon />,
        label: "Python",
        description: "Learn Python for automation and backend.",
        href: "/courses/python",
        active: false,
      },
      {
        icon: <JavaIcon />,
        label: "Java",
        description: "Build robust apps with Java.",
        href: "/courses/java",
        active: true,
      },
      {
        icon: <CppIcon />,
        label: "C++",
        description: "Master C++ for high-performance coding.",
        href: "/courses/cpp",
        active: false,
      },
    ],
  },
  {
    title: "Database",
    items: [
      {
        icon: <MySqlIcon />,
        label: "MySQL",
        description: "Learn SQL for relational databases.",
        href: "/courses/mysql",
        active: false,
      },
      {
        icon: <MongoDB />,
        label: "MongoDB",
        description: "Work with NoSQL using MongoDB.",
        href: "/courses/mongodb",
        active: false,
      },
    ],
  },
  {
    title: "Cloud",
    items: [
      {
        icon: <ICloudIcon />,
        label: "AWS",
        description: "Deploy apps on AWS cloud.",
        href: "/courses/aws",
        active: false,
      },
      {
        icon: <SoundCloudIcon />,

        label: "Azure",
        description: "Learn cloud services with Azure.",
        href: "/courses/azure",
        active: false,
      },
      {
        icon: <CloudWaysIcon />,
        label: "GCP",
        description: "Use GCP for cloud solutions.",
        href: "/courses/gcp",
        active: false,
      },
    ],
  },
  {
    title: "Web Development",
    items: [
      {
        icon: <HTMLIcon />,
        label: "HTML",
        description: "Structure web pages with HTML.",
        href: "/courses/html",
        active: false,
      },
      {
        icon: <CSSIcon />,
        label: "CSS",
        description: "Style websites using CSS.",
        href: "/courses/css",
        active: false,
      },
      {
        icon: <JSIcon />,
        label: "JavaScript",
        description: "Make websites interactive with JS.",
        href: "/courses/javascript",
        active: false,
      },
      {
        icon: <ReactIcon />,
        label: "React",
        description: "Build UIs using React.js.",
        href: "/courses/react",
        active: false,
      },
    ],
  },
  {
    title: "Data Mastery",
    items: [
      {
        icon: <DataIcon />,
        label: "Data Science",
        description: "Analyze data and find insights.",
        href: "/courses/data-science",
        active: false,
      },
      {
        icon: <GoogleAnalyticsIcons />,
        label: "Data Analytics",
        description: "Interpret data for decisions.",
        href: "/courses/data-analytics",
        active: false,
      },
      {
        icon: <BitRiseIcon />,
        label: "Machine Learning",
        description: "Build predictive ML models.",
        href: "/courses/machine-learning",
        active: false,
      },
      {
        icon: <DataIcon />,
        label: "Data Engineering",
        description: "Manage and move big data.",
        href: "/courses/data-engineering",
        active: false,
      },
      {
        icon: <LineageOsIcon />,
        label: "Deep Learning",
        description: "Train neural networks.",
        href: "/courses/deep-learning",
        active: false,
      },
      {
        icon: <GenerativeAiIcon />,
        label: "Generative AI",
        description: "Create content using AI.",
        href: "/courses/generative-ai",
        active: false,
      },
    ],
  },
];
