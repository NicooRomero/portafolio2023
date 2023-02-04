const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
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

        cb(uploadError, 'public/uploads/posts')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
})

const upload = multer({ storage });

router.get('/', postController.getPosts);
router.get('/get-post/:url', postController.getPost);
router.get('/total/post', postController.totalPosts);
//router.get('/pinned/:count', postController.getPinned);
router.get('/pinned/', postController.getPinned);
router.post('/',[auth.ensureAuth], upload.single('img'), postController.addPost);
router.put('/:id', [auth.ensureAuth], upload.single('img'), postController.updatePost);
router.delete('/:id',[auth.adminAuth], postController.deletePost);

module.exports = router;