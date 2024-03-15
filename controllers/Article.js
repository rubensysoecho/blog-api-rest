const fs = require('fs')
const { validateArticle } = require('../helper/validate')
const Article = require('../models/Article')

const save = (req, res) => {

    let params = req.body

    try {
        validateArticle(res, params)
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: '❌ An error occurred'
        })
    }

    const article = new Article(params)

    article.save()
        .then(() => {
            console.log('✅ Article saved')
        })
        .catch((err) => {
            console.log(`❌ Error de guardado: ${err}`)
        })

    return res.status(200).json({
        msg: "Success",
        params
    })
}

const get = async (req, res) => {

    try {
        let query = await Article.find({})
            .sort({ fecha: 1 })
            .exec()

        res.status(200).send({
            status: "success",
            param: req.params.last,
            articles: query
        })
    } catch (err) {
        res.status(404).json({
            status: "error",
            msg: "No articles were found!"
        })
    }

}

const getOne = async (req, res) => {
    let id = req.params.id

    try {
        const article = await Article.findById(id).exec()
        res.status(200).json({
            status: "success",
            article: article
        })
    } catch (err) {
        res.status(400).json({
            status: "error",
            msg: "No article were found!"
        })
    }

}

const kill = async (req, res) => {
    let id = req.params.id

    try {
        await Article.findOneAndDelete({ _id: id })
        res.status(200).json({
            status: "success",
            msg: "Article successfully deleted!"
        })
    } catch (err) {
        res.status(400).json({
            status: "error",
            msg: "No article were found!"
        })
    }
}

const edit = async (req, res) => {
    let id = req.params.id
    let params = req.body

    try {
        validateArticle(res, params)
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: '❌ An error occurred'
        })
    }

    try {
        const updatedArticle = await Article.findOneAndUpdate({ _id: id }, params)
        res.status(200).json({
            status: "success",
            msg: "Article updated successfully!",
            article: updatedArticle
        })
    } catch (error) {
        return res.status(400).json({
            status: "error",
            msg: '❌ Article couldnt be updated'
        })
    }

}

const upload = (req, res) => {

    if (!req.file && !req.files) {
        return res.status(404).json({
            status: "error",
            msg: "❌ Invalid request"
        })
    }

    let fileName = req.file.originalname
    let file_split = file.split("\.")
    let extension = file_split[1]

    if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {
        fs.unlink(req.file.path, (err) => {
            return res.status(400).json({
                status: "error",
                msg: "❌ Extension not valid"
            })
        })
    } else {
        let id = req.params.id

        try {
            const updatedArticle = Article.findOneAndUpdate({ _id: id }, { image: req.file.filename })
            res.status(200).json({
                status: "success",
                msg: "Article updated successfully!",
                article: updatedArticle,
                file: req.file
            })
        } catch (error) {
            return res.status(400).json({
                status: "error",
                msg: '❌ Article couldnt be updated'
            })
        }
    }
}

module.exports = {
    save,
    get,
    getOne,
    kill,
    edit,
    upload
}