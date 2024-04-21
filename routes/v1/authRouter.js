const router = require('express').Router();
const controller = require('../../controllers/v1/authController');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/authenticate', controller.authorize);

module.exports = router;