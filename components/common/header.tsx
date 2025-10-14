"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

import { AlignRight } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
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
} from "../icons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "../login-form";
import AuthButton from "../auth-button";

const Header = () => {
  return (
    <>
      <header className="relative mx-auto h-18 w-full max-w-5xl justify-between border-b-2 border-neutral-600 px-2 md:flex md:h-auto md:items-center md:border-0 md:py-6">
        <div className="corner-squircle absolute bottom-0 left-7 w-max translate-y-1/2 rounded-lg bg-white p-4 shadow-md md:static md:translate-0">
          <Link href={"/"}>
            <Image
              src={"/images/logo/coding-for-career.svg"}
              alt="coding for career logo"
              width={400}
              height={400}
              className="h-auto w-28 object-contain"
            />
          </Link>
        </div>
        <div className="flex h-full items-center justify-end">
          <div className="flex items-center gap-2">
            <AuthButton />
            {false && (
              <Dialog>
                <DialogTrigger asChild>
                  {
                    <Button className="corner-squircle rounded-2xl border border-pink-600 bg-pink-100 text-base font-medium text-pink-600 hover:bg-pink-200">
                      Get Started
                    </Button>
                  }
                </DialogTrigger>
                <DialogContent className="rounded border-0 bg-neutral-100 backdrop-blur-lg">
                  <DialogHeader>
                    <DialogTitle className="sr-only">Log in</DialogTitle>
                  </DialogHeader>
                  <LoginForm />
                </DialogContent>
              </Dialog>
            )}

            <Button className="bg-transparent text-black hover:bg-white md:hidden">
              <AlignRight />
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto hidden w-full max-w-5xl border-y-2 md:block">
        <div className="flex items-center justify-center gap-1">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navigationItems.map((menu, index) =>
                menu.items ? (
                  <NavigationMenuItem
                    key={index}
                    className="flex h-20 items-center"
                  >
                    <NavigationMenuTrigger className="bg-transparent text-base">
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="corner-squircle z-20 !rounded-2xl !bg-white/80 !shadow-xl backdrop-blur-2xl">
                      <ul className="grid w-56 gap-4 font-normal">
                        <li>
                          {menu.items.map((item, idx) => (
                            <NavigationMenuLink asChild key={idx}>
                              <Link
                                href={item.active ? item.href : "#"}
                                className={`corner-squircle !rounded-xl !p-3`}
                              >
                                <div
                                  className={`flex items-center gap-4 py-2 text-left text-lg font-medium ${
                                    item.active
                                      ? "text-neutral-800"
                                      : "text-neutral-500"
                                  }`}
                                >
                                  <span
                                    className={`scale-180 ${
                                      item.active
                                        ? "fill-neutral-800"
                                        : "fill-neutral-500"
                                    }`}
                                  >
                                    {item.icon}
                                  </span>
                                  {item.label}
                                </div>
                                {/* <div className="text-muted-foreground">
                                  {item.description}
                                </div> */}
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem
                    key={index}
                    className="flex h-20 items-center"
                  >
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={menu.href}>{menu.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
};

export default Header;

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
  {
    title: "DSA",
    href: "/courses/dsa",
    active: false,
  },
  // {
  //   title: "Interview Preparation",
  //   href: "/courses/interview-prep",
  // },
  // {
  //   title: "Competitive Programming",
  //   href: "/courses/competitive-programming",
  // },
  {
    title: "Blogs",
    href: "/blogs",
  },
];
