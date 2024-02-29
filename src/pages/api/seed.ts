import prisma from "@/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  prisma.user.deleteMany().then(() => {
    console.log("Deleted all users");
  });
  res.status(200).json({});
  prisma.$disconnect();
}
