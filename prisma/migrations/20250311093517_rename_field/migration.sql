/*
  Warnings:

  - You are about to drop the column `ingridents` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `ingredents` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "ingridents",
ADD COLUMN     "ingredents" JSONB NOT NULL;
