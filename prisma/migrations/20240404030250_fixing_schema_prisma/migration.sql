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

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "bank_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
