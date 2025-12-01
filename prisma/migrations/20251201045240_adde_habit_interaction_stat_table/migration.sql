/*
  Warnings:

  - You are about to drop the column `followCount` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `likeCount` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "followCount",
DROP COLUMN "likeCount";

-- CreateTable
CREATE TABLE "HabitInteractionStat" (
    "habitId" INTEGER NOT NULL,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "followCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HabitInteractionStat_pkey" PRIMARY KEY ("habitId")
);

-- AddForeignKey
ALTER TABLE "HabitInteractionStat" ADD CONSTRAINT "HabitInteractionStat_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
