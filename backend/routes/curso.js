const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const auth = require('../middlewares/auth');
const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Tipo de archivo no válido. Solo se permiten png/jpeg/jpg');

        if(isValid) {
            uploadError = null
        }

        cb(uploadError, 'public/uploads/cursos')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
})

const upload = multer({ storage });

router.get('/', cursoController.getCursos);
router.get('/:id',[auth.ensureAuth], cursoController.getCurso);
router.get('/total/cursos', cursoController.getCount);
router.post('/',[auth.adminAuth], upload.single('image'), cursoController.addCurso);
router.post('/fixupload', (req, res) => {
    if(req) {
        return res.status(200).send({ message: 'Subiendo Imagen.'});
    }
})
router.put('/:id',[auth.ensureAuth], upload.single('image'), cursoController.updateCurso);
router.delete('/:id',[auth.adminAuth], cursoController.deleteCurso);

module.exports = router;