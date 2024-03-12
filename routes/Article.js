const express = require('express')
const router = express.Router()

const ArticleController = require('../controllers/Article')

// Ruta de prueba
router.get('/test', ArticleController.test)
router.post('/save', ArticleController.save)
router.get('/articles/:last?', ArticleController.get)
router.get('/article/:id', ArticleController.getOne)

module.exports = router