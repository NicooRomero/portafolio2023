const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const auth = require('../middlewares/auth');

router.get('/', menuController.getMenus);
router.get('/total-menu', menuController.getCount);
router.post('/', [auth.ensureAuth, auth.adminAuth], menuController.addMenu);
router.put('/:id', [auth.ensureAuth], menuController.updateMenu);
router.put('/activate/:id', [auth.ensureAuth], menuController.activeMenu);
router.delete('/:id', [auth.ensureAuth, auth.adminAuth], menuController.deleteMenu);

module.exports = router;