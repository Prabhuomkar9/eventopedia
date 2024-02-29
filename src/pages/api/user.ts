import prisma from "@/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log(req.body)
    const { email, name, branch, usn, password } = req.body;
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        branch: branch,
        password: password,
        usn: usn,
        club: "FLC"
      },
    });
    console.log(user)
    res.status(200).json(user);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  prisma.$disconnect();
}
