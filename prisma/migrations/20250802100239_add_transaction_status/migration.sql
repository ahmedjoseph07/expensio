/*
  Warnings:

  - The `status` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "public"."transactions" DROP COLUMN "status",
ADD COLUMN     "status" "public"."TransactionStatus" NOT NULL DEFAULT 'COMPLETED';

-- DropEnum
DROP TYPE "public"."transactionStatus";
