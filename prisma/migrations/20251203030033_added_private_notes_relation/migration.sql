-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "_NoteAllowedViewers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_NoteAllowedViewers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NoteAllowedViewers_B_index" ON "_NoteAllowedViewers"("B");

-- AddForeignKey
ALTER TABLE "_NoteAllowedViewers" ADD CONSTRAINT "_NoteAllowedViewers_A_fkey" FOREIGN KEY ("A") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NoteAllowedViewers" ADD CONSTRAINT "_NoteAllowedViewers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
