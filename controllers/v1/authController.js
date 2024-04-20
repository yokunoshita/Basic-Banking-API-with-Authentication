const  { PrismaClient } = require ("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { MAGIC_WORD } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password  } = req.body;

            let exist = await prisma.users.findFirst({where:{ email: email }});

            if(!name || !email || !password){
                return res.status(400).json({
                    status: false,
                    message: "fill all requirments",
                    data: null
                });
            }

            if(exist){
                return res.status(400).json({
                    status: false,
                    message: "email already been used",
                    data: null
                });
            }

            let encryptedPw = await bcrypt.hash(password, 10);

            let user = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: encryptedPw
                }
            });

            res.status(201).json({
                status: 'success',
                message: `Successfully register for ${user.name}`,
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            let {email, password} = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: "fill all requirments",
                    data: null
                });
            }

            let exist = await prisma.users.findUnique({where:{ email }});
            if (!exist) {
                return res.status(400).json({
                    status: false,
                    message: "invalid email or password",
                    data: null
                });
            }

            let pass = await bcrypt.compare(password, exist.password);
            if (!pass) {
                return res.status(400).json({
                    status: false,
                    message: "invalid email or password",
                    data: null
                });
            }
            delete exist.password;

            let token = jwt.sign(exist, MAGIC_WORD);
            return res.status(200).json({
                status: 'success',
                message: 'Ok',
                data: {...exist, token}
            });
        } catch (error) {
            next(error)
        }
    },

    authorize: async (req, res, next) => {
        try {
            return res.status(200).json({
                status: true,
                message: 'Ok',
                data: req.users
            });
        } catch (error) {
            next(error)
        }
    }
};