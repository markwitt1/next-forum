-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "parentId" TEXT,
    CONSTRAINT "Post_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "content", "id", "parentId") SELECT "authorId", "content", "id", "parentId" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
