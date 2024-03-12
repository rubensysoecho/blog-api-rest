const { Schema, model } = require('mongoose')

const ArticleSchema = Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "default.png"
    }
})

module.exports = model('Article', ArticleSchema, 'articles')