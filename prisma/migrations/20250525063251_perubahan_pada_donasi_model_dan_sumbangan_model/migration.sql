/*
  Warnings:

  - You are about to drop the column `status_pengiriman` on the `sumbangan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donasi" ADD COLUMN     "status_pengiriman" TEXT DEFAULT 'sedang di proses';

-- AlterTable
ALTER TABLE "sumbangan" DROP COLUMN "status_pengiriman";
