const router = require('express').Router();
const controller = require('../../controllers/v1/accountController');

router.post('/', controller.create);
router.get('/', controller.index);
router.get('/:id', controller.show);

module.exports = router;