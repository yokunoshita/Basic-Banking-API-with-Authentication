const router = require('express').Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const accountRouter = require('./accountRouter');
const transactionRouter = require('./transactionRouter');
const restrict = require('../../middlewares/auth.middleware');

router.use('/auth', authRouter)
router.use('/users', restrict, userRouter);
router.use('/accounts', restrict, accountRouter);
router.use('/transactions', restrict, transactionRouter);

module.exports = router;