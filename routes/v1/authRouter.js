const router = require('express').Router();
const controller = require('../../controllers/v1/authController');
const restrict = require('../../middlewares/auth.middleware');

router.post('/register', controller.register);
router.get('/login', controller.login);
router.get('/authenticate', restrict, controller.authorize);

module.exports = router;