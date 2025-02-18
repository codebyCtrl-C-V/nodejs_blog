const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const newsController = require('../app/controllers/NewsController');

router.get('/create', newsController.create);
router.post('/upload',upload.single('image'), newsController.upload);
router.get('/update/:id', newsController.edit);
router.post('/update/:id', upload.single('image'),newsController.update); 
router.delete('/delete/:id', newsController.delete);
router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
