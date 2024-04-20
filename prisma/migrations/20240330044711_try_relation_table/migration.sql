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
CREATE TABLE "TransactionBankAccount" (
    "id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "bank_account_id" INTEGER NOT NULL,

    CONSTRAINT "TransactionBankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BankAccountToTransactionBankAccount" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_TransactionBankAccountToTransactions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionBankAccount_transaction_id_bank_account_id_key" ON "TransactionBankAccount"("transaction_id", "bank_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "_BankAccountToTransactionBankAccount_AB_unique" ON "_BankAccountToTransactionBankAccount"("A", "B");

-- CreateIndex
CREATE INDEX "_BankAccountToTransactionBankAccount_B_index" ON "_BankAccountToTransactionBankAccount"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TransactionBankAccountToTransactions_AB_unique" ON "_TransactionBankAccountToTransactions"("A", "B");

-- CreateIndex
CREATE INDEX "_TransactionBankAccountToTransactions_B_index" ON "_TransactionBankAccountToTransactions"("B");

-- AddForeignKey
ALTER TABLE "_BankAccountToTransactionBankAccount" ADD CONSTRAINT "_BankAccountToTransactionBankAccount_A_fkey" FOREIGN KEY ("A") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BankAccountToTransactionBankAccount" ADD CONSTRAINT "_BankAccountToTransactionBankAccount_B_fkey" FOREIGN KEY ("B") REFERENCES "TransactionBankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionBankAccountToTransactions" ADD CONSTRAINT "_TransactionBankAccountToTransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "TransactionBankAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TransactionBankAccountToTransactions" ADD CONSTRAINT "_TransactionBankAccountToTransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
