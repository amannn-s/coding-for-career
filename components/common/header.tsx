"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignRight, Search, User, UserRound } from "lucide-react";

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
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "../login-form";
import { Input } from "../ui/input";
// import { signOut, useSession } from "next-auth/react";

const Header = () => {
  //   const { status, data: session } = useSession();
  //   console.log(status, session);

  function logoutHandler() {
    // signOut();
  }

  return (
    <>
      <header className="relative mx-auto h-18 max-w-5xl justify-between border-b-2 border-neutral-600 px-7 md:flex md:h-auto md:items-center md:border-0 md:py-6">
        {/* <div className="hidden items-center gap-1 md:flex">
          <Button className="bg-white text-black hover:bg-transparent">
            <AlignRight />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size={"icon"}
                className="rounded-full bg-white text-black hover:bg-transparent"
              >
                <Search />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="sr-only">Search</DialogTitle>
                <Input
                  className="rounded-none border-0 border-b-2 border-blue-600 ring-0 focus:ring-0"
                  placeholder="Search..."
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div> */}
        <div
          className="absolute bottom-0 left-7 w-max translate-y-1/2 rounded-lg bg-white p-4 md:static md:translate-0 corner-squircle"
          style={{
            boxShadow: "2px 4px 6px rgba(0,0,0,0.15)",
          }}
        >
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
          <div className="flex items-center gap-1">
            {false && (
              <Dialog>
                <DialogTrigger asChild>
                  {
                    <Button className="rounded-2xl border border-pink-600 bg-pink-100 text-base font-medium text-pink-600 hover:bg-pink-200 corner-squircle">
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
            {true && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size={"icon"}
                      className="rounded-full bg-white text-black hover:bg-transparent"
                    >
                      <UserRound />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {/* <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Team</DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          Invite users
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>Email</DropdownMenuItem>
                            <DropdownMenuItem>Message</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>More...</DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler}>
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            <Button className="bg-white text-black hover:bg-transparent md:hidden">
              <AlignRight />
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto hidden max-w-5xl border-y-2 md:block">
        <div className="flex items-center justify-center gap-1">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navigationItems.map((menu, index) =>
                menu.items ? (
                  <NavigationMenuItem
                    key={index}
                    className="flex h-20 items-center"
                  >
                    <NavigationMenuTrigger className="text-base">
                      {menu.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="!rounded-2xl corner-squircle !bg-white/80 backdrop-blur-sm !shadow-xl">
                      <ul className="grid w-[200px] gap-4">
                        <li>
                          {menu.items.map((item, idx) => (
                            <NavigationMenuLink asChild key={idx}>
                              <Link
                                href={item.active ? item.href : "#"}
                                className={`!rounded-xl corner-squircle !p-3`}
                              >
                                <div
                                  className={`flex items-center gap-4 py-2 text-left text-lg font-medium ${
                                    item.active
                                      ? "text-neutral-800"
                                      : "text-neutral-500"
                                  }`}
                                >
                                  <span
                                    className={`scale-180  ${
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
                )
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
