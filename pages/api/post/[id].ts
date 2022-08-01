import prismaClient from "../../../prismaClient";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id as string;

  if (req.method === "GET") {
    handleGET(postId, res);
  } else if (req.method === "DELETE") {
    handleDELETE(postId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/post/:id
async function handleGET(postId: string, res: NextApiResponse) {
  const post = await prismaClient.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });
  res.json(post);
}

// DELETE /api/post/:id
async function handleDELETE(postId: string, res: NextApiResponse) {
  const post = await prismaClient.post.delete({
    where: { id: postId },
  });
  res.json(post);
}
