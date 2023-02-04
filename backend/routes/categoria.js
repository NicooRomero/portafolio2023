const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middlewares/auth');

router.get('/', categoriaController.getCategorias);
router.get('/:id', categoriaController.getCategoria);
router.post('/', [auth.ensureAuth],  categoriaController.addCategoria);
router.put('/:id', [auth.ensureAuth], categoriaController.updateCategoria);
router.delete('/:id', [auth.ensureAuth],  categoriaController.deleteCategoria);


module.exports = router;