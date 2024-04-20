const  { PrismaClient } = require ("@prisma/client");
const prisma = new PrismaClient();

module.exports = {

    //register user + profile
    create: async (req, res, next) => {
        try {
            let {name, email, password, identity_type, identity_number, address} = req.body;

            let exist = await prisma.users.findFirst({
                where: {email}
            });

            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already exist'
                });
            }

            let user = await prisma.users.create({
                data:{
                    name,
                    email, 
                    password,
                    profiles: {
                        create:{
                            identity_type, 
                            identity_number, 
                            address 
                        }
                    }
                },
                include: {
                    profiles: true
                }
            });

            res.status(201).json({
                status: true,
                message: 'Ok',
                data: user
            });
            
        } catch (error) {
            next(error)
        }
    },

    //list users
    index: async (req, res, next) => {
        try {
            let listUser = await prisma.users.findMany({
                include: {profiles: true},
            });

            res.status(200).json({
                status:"true",
                message:"Ok",
                data: listUser
            });
        } catch (error) {
            next(error)
        }
    },

    //detail user
    show: async (req, res, next) => {
        let userId = Number(req.params.id);

        try {
            let user = await prisma.users.findUnique({
                where: {id: userId},
                include: {profiles: true}
            });

            if (!user) {
                return res.status(404).json({
                    status: "false",
                    message:"can\'t find user with id : "+id,
                    data: null
                });
            }
            res.status(200).json({
                status:"true",
                message:"Ok",
                data: user
            });
        } catch (error) {
            next(error)
        }
    }
}