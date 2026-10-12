/*
  Warnings:

  - You are about to drop the column `salesManId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `SalesMan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `merchantId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_salesManId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "salesManId",
ADD COLUMN     "merchantId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SalesMan";

-- CreateTable
CREATE TABLE "Merchent" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Merchent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merchent_email_key" ON "Merchent"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
