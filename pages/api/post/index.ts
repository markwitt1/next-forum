// POST /api/post
import prismaClient from "../../../prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { content, parentId } = req.body;
  const session = await unstable_getServerSession(req, res, authOptions);

  let parentData = {};
  if (typeof parentId === "string") {
    parentData = {
      parent: {
        connect: {
          id: parentId,
        },
      },
    };
  }

  if (session?.user?.email) {
    const result = await prismaClient.post.create({
      data: {
        author: {
          connect: {
            email: session.user.email,
          },
        },
        content,
        ...parentData,
      },
    });
    res.json(result);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}
