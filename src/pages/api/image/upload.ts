import authOptions from "@/lib/auth";
import prisma from "@/server/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log("Uploading Image...")
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user)
      throw new Error("User not logged in.")

    const user = await prisma.user.findFirst({
      where: { id: session.user.id }
    })

    if (!user)
      throw new Error("User not found.")



  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


export default handler
