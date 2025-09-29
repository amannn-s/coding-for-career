import prisma from "@/lib/prisma";
import React from "react";

const TestPage = async () => {
  const users = await prisma.user.findMany();

  console.log(users);

  return <div>TestPage</div>;
};

export default TestPage;
