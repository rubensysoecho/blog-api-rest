const express = require('express')
const multer = require('multer')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/articles/')
    },

    filename: function(req, file, cb) {
        cb(null, 'article' + Date.now() + file.originalname)
    }
})
const uploads = multer({
    storage: storage
})

const ArticleController = require('../controllers/Article')

router.get('/articles/:last?', ArticleController.get)
router.get('/article/:id', ArticleController.getOne)
router.post('/save', ArticleController.save)
router.delete('/article/:id', ArticleController.kill)
router.put('/article/:id', ArticleController.edit)
router.post('/upload-image/:id', [uploads.single('file')], ArticleController.upload)

module.exports = router