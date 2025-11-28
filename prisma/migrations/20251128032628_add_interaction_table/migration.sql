/*
  Warnings:

  - You are about to drop the column `likes` on the `Note` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('HABIT', 'NOTE');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('LIKE', 'FOLLOW', 'FAVORITE');

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "likes",
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Interaction" (
    "userId" INTEGER NOT NULL,
    "resourceType" "ResourceType" NOT NULL,
    "resourceId" INTEGER NOT NULL,
    "type" "InteractionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("userId","resourceType","resourceId","type")
);

-- CreateIndex
CREATE INDEX "Interaction_resourceType_resourceId_idx" ON "Interaction"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "Interaction_userId_idx" ON "Interaction"("userId");

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
