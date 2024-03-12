const validator = require('validator')
const Article = require('../models/Article')

const test = (req, res) => {
    return res.status(200).json({
        msg: "Esto es un test"
    })
}

const save = (req, res) => {

    let params = req.body

    try {
        let validate_title = !validator.isEmpty(params.title) &&
            validator.isLength(params.title, { min: 5, max: 15 })

        let validate_content = !validator.isEmpty(params.content)

        if (!validate_title || !validate_content) {
            throw new Error('❌ Data couldnt be validated')
        }

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

    /*article.save((err, articleSaved) => {
        if (err || !articleSaved) {
            return res.status(400).json({
                status: "error",
                msg: '❌ The article hasnt been saved'
            })  
        }

        return res.status(200).json({
            status: "success",
            article: articleSaved,
            msg: "✅ Article successfully created!"
        })
    })*/

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

module.exports = {
    test,
    save,
    get,
    getOne
}