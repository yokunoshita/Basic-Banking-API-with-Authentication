/*
  Warnings:

  - You are about to drop the `transaction_destinations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transaction_sources` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "transaction_destinations" DROP CONSTRAINT "transaction_destinations_destination_account_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_destinations" DROP CONSTRAINT "transaction_destinations_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "transaction_sources" DROP CONSTRAINT "transaction_sources_source_account_id_fkey";

-- DropForeignKey
ALTER TABLE "transaction_sources" DROP CONSTRAINT "transaction_sources_transactionId_fkey";

-- DropTable
DROP TABLE "transaction_destinations";

-- DropTable
DROP TABLE "transaction_sources";

-- CreateTable
CREATE TABLE "_BankAccountToTransactions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BankAccountToTransactions_AB_unique" ON "_BankAccountToTransactions"("A", "B");

-- CreateIndex
CREATE INDEX "_BankAccountToTransactions_B_index" ON "_BankAccountToTransactions"("B");

-- AddForeignKey
ALTER TABLE "_BankAccountToTransactions" ADD CONSTRAINT "_BankAccountToTransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BankAccountToTransactions" ADD CONSTRAINT "_BankAccountToTransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
