const  { PrismaClient } = require ("@prisma/client");
const prisma = new PrismaClient();

module.exports = {

    //transaksi baru
    create: async (req, res, next) => {
        let {source_account_id, destination_account_id, amount} = req.body;

        try {
            let sourceAccount = await prisma.bankAccount.findUnique({
                where: {id: Number(source_account_id)},
            });

            let destinationAccount = await prisma.bankAccount.findUnique({
                where: {id: Number(destination_account_id)},
            });

            if (!sourceAccount || !destinationAccount) {
                return res.status(404).json({
                    status: false,
                    message: 'cant find the accounts'
                });
            }

            if (amount > sourceAccount.balance) {
                return res.status(400).json({
                    status: false,
                    message: 'your balance is not enough'
                });
            }

            let transfer = await prisma.transactions.create({
                data:{
                    source_account_id:sourceAccount.id,
                    destination_account_id:destinationAccount.id,
                    amount,
                }
            });

            //update balance when transfet = true
            await prisma.bankAccount.update({
                where: {id: Number(source_account_id)},
                data: {
                    balance: sourceAccount.balance - amount
                }
            });

            await prisma.bankAccount.update({
                where: {id: Number(destination_account_id)},
                data: {
                    balance: destinationAccount.balance + amount
                }
            });

            res.status(201).json({
                status: true,
                message: 'Ok',
                data: transfer
            });
        } catch (error) {
            next(error)
        }
    },

    //list transaction
    index: async (req, res, next) => {
        try {
            let transactions = await prisma.transactions.findMany();
            res.status(200).json({
                status:"true",
                message:"Ok",
                data: transactions
            });
        } catch (error) {
            next(error)
        }
    },

    //detail transaction
    show: async (req, res, next) => {
        let transactionId = Number(req.params.id);

        try {
            let transaction = await prisma.transactions.findUnique({
                where: {id: transactionId},
                include:{
                    source_account:true,
                    destination_account:true
                }
            });

            if (!transaction) {
                return res.status(404).json({
                    status: "false",
                    message:"can\'t find the transaction",
                    data: null
                });
            }
            
            res.status(200).json({
                status:"true",
                message:"Ok",
                data: transaction
            });
        } catch (error) {
            next(error)
        }
    }
}