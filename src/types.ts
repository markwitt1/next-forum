import { Post, User } from "@prisma/client";

type PostWithAuthor = Post & {
  author: User;
};

export type PostData = PostWithAuthor & {
  children: PostData[];
  level: number;
};
