-- CreateTable
CREATE TABLE "_UserOnMeetups" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserOnMeetups_AB_unique" ON "_UserOnMeetups"("A", "B");

-- CreateIndex
CREATE INDEX "_UserOnMeetups_B_index" ON "_UserOnMeetups"("B");

-- AddForeignKey
ALTER TABLE "_UserOnMeetups" ADD CONSTRAINT "_UserOnMeetups_A_fkey" FOREIGN KEY ("A") REFERENCES "Meetup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserOnMeetups" ADD CONSTRAINT "_UserOnMeetups_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
