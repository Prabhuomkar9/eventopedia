import prisma from "@/server/prisma";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
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
    res.status(200).json(user);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  prisma.$disconnect();
}
