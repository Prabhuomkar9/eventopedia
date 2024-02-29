import prisma from "@/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (req.body.type === "get") {
      console.log(req.body)
      const users = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        }
      });
      console.log(users)
      res.status(200).json(users);
    }
    else if (req.body.type === "create") {
      console.log(req.body)
      const { email, name, branch, usn, password } = req.body;
      const user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          branch: branch,
          password: password,
          usn: usn,
        },
      });
      console.log(user)
      res.status(200).json(user);
    } else if (req.body.type === "update") {
      const response = await prisma.user.update({
        where: {
          email: req.body.email,
        },
        data: {
          name: req.body.name,
          branch: req.body.branch,
          password: req.body.password,
          usn: req.body.usn,
        }
      })
      console.log(response)
      res.status(200).json(response);
    } else if (req.body.type === "delete") {
      const response = await prisma.user.delete({
        where: {
          email: req.body.email,
        }
      })
      console.log(response)
      res.status(200).json(response);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }

  prisma.$disconnect();
}
