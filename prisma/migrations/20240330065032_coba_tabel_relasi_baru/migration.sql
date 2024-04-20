/*
  Warnings:

  - You are about to drop the `_BankAccountToTransactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BankAccountToTransactions" DROP CONSTRAINT "_BankAccountToTransactions_A_fkey";

-- DropForeignKey
ALTER TABLE "_BankAccountToTransactions" DROP CONSTRAINT "_BankAccountToTransactions_B_fkey";

-- DropTable
DROP TABLE "_BankAccountToTransactions";

-- CreateTable
CREATE TABLE "transaction_sources" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "source_account_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction_destinations" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "destination_account_id" INTEGER NOT NULL,

    CONSTRAINT "transaction_destinations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction_sources" ADD CONSTRAINT "transaction_sources_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_sources" ADD CONSTRAINT "transaction_sources_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_destinations" ADD CONSTRAINT "transaction_destinations_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_destinations" ADD CONSTRAINT "transaction_destinations_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
