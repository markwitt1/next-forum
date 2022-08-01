import { Post, User } from "@prisma/client";

type PostWithAuthor = Post & {
  author: User;
};

export interface PostData extends PostWithAuthor {
  children: Post[];
  level: number;
}

export interface RecursivePost extends PostData {
  children: RecursivePost[];
}
