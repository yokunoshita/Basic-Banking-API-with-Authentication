const  { PrismaClient } = require ("@prisma/client");
const prisma = new PrismaClient();

module.exports = {

    //akun aru ke existed user
    create: async (req, res, next) => {
        try {
            let {users_id,bank_name, bank_account_number, balance} = req.body;

            let newAccount = await prisma.bankAccount.create({
                data:{
                    bank_name,   
                    bank_account_number, 
                    balance,
                    users: {
                        connect: {id: Number(users_id)}
                    }
                }
            });

            res.status(201).json({
                status: true,
                message: 'Ok',
                data: newAccount
            });
            
        } catch (error) {
            next(error)
        }
    },

    //list account
    index:async (req, res, next) => {
        try {
            let listAccount = await prisma.bankAccount.findMany({
                include: {
                    users: true
                },
            });

            res.status(200).json({
                status:"true",
                message:"Ok",
                data: listAccount
            });
        } catch (error) {
            next(error)
        }
    },

    //detail account
    show: async (req, res, next) => {
        let accountId = Number(req.params.id);

        try {
            let account = await prisma.bankAccount.findUnique({
                where: {id: accountId},
                include: {users: true}
            });

            if (!account) {
                return res.status(404).json({
                    status: "false",
                    message:"can\'t find the account",
                    data: null
                });
            }

            res.status(200).json({
                status:"true",
                message:"Ok",
                data: account
            });
        } catch (error) {
            next(error)
        }
    },
}