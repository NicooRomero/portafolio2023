const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const auth = require('../middlewares/auth');

router.get('/', portfolioController.getProjects);
router.get('/:id', portfolioController.getProject);
router.get('/proyects/count', portfolioController.getCount);
router.post('/', portfolioController.addProject);
router.put('/proyect/:id', portfolioController.editProject);
router.delete('/:id', portfolioController.deleteProject);

module.exports = router;