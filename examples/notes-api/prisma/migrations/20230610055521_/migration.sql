/*
  Warnings:

  - A unique constraint covering the columns `[uuid,ownerUuid]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_uuid_ownerUuid_key" ON "Note"("uuid", "ownerUuid");
