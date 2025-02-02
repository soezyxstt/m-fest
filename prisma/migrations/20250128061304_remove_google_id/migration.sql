/*
  Warnings:

  - You are about to drop the column `googleId` on the `profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "profile_googleId_key";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "googleId",
ALTER COLUMN "identityCardUrl" DROP NOT NULL,
ALTER COLUMN "pdDiktiUrl" DROP NOT NULL,
ALTER COLUMN "followIGUrl" DROP NOT NULL,
ALTER COLUMN "twibbon" DROP NOT NULL;
