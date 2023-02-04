const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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
        let uploadError = new Error('Tipo de imagen no válido. Solo se aceptan png/jpeg/jpg.');

        if(isValid) {
            uploadError = null
        }

        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // default
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const upload = multer({ storage: storage });

router.get('/', [auth.ensureAuth], userController.getUsers);
router.get('/:id',[auth.ensureAuth], userController.getUser);
router.get('/total/users', userController.getCount);
router.post('/', upload.single('image'), userController.addUser);
router.post('/login', userController.loginUser);
router.put('/:id',[auth.ensureAuth], upload.single('image'), userController.updateUser);
router.delete('/:id',[auth.ensureAuth, auth.adminAuth], userController.deleteUser);

module.exports = router;