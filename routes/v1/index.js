const router = require('express').Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const accountRouter = require('./accountRouter');
const transactionRouter = require('./transactionRouter');

router.use('/auth', authRouter)
router.use('/users', userRouter);
router.use('/accounts', accountRouter);
router.use('/transactions', transactionRouter);

module.exports = router;