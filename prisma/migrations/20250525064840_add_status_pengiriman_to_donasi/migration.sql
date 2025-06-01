-- AlterTable
ALTER TABLE "Donasi" ALTER COLUMN "status_pengiriman" SET DEFAULT 'menunggu';

-- AlterTable
ALTER TABLE "sumbangan" ADD COLUMN     "status_pengiriman" TEXT DEFAULT 'menunggu';
