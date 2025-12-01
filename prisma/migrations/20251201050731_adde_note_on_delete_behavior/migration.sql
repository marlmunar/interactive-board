-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_habitId_fkey";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
