/*
  Warnings:

  - You are about to drop the `TransactionBankAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BankAccountToTransactionBankAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TransactionBankAccountToTransactions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BankAccountToTransactionBankAccount" DROP CONSTRAINT "_BankAccountToTransactionBankAccount_A_fkey";

-- DropForeignKey
ALTER TABLE "_BankAccountToTransactionBankAccount" DROP CONSTRAINT "_BankAccountToTransactionBankAccount_B_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionBankAccountToTransactions" DROP CONSTRAINT "_TransactionBankAccountToTransactions_A_fkey";

-- DropForeignKey
ALTER TABLE "_TransactionBankAccountToTransactions" DROP CONSTRAINT "_TransactionBankAccountToTransactions_B_fkey";

-- DropTable
DROP TABLE "TransactionBankAccount";

-- DropTable
DROP TABLE "_BankAccountToTransactionBankAccount";

-- DropTable
DROP TABLE "_TransactionBankAccountToTransactions";

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
