import prisma from "@/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.create({
    data: {
      email: "omkar2",
      name: "omkar",
      branch: "CSE",
      password: "sdfsdf",
      usn: "asdfasdf",
      club: "VISTA"
    },
  });
  console.log(user)
  res.status(200).json(user);
  prisma.$disconnect();
}
