/*
  Warnings:

  - Added the required column `recipesCount` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipesCount` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('READ', 'UNREAD');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "recipesCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "recipesCount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "contactUs" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'UNREAD';
