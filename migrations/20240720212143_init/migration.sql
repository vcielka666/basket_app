/*
  Warnings:

  - You are about to drop the column `ProductName` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ProductName",
ADD COLUMN     "name" TEXT;
