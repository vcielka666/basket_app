/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShopCenter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shopId_fkey";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "ShopCenter";

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "shopCenterName" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productWeight" DOUBLE PRECISION NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
