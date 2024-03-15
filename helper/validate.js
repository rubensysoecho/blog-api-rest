const validator = require('validator')

const validateArticle = (params) => {
    let validate_title = !validator.isEmpty(params.title) &&
        validator.isLength(params.title, { min: 5, max: 15 })

    let validate_content = !validator.isEmpty(params.content)

    if (!validate_title || !validate_content) {
        throw new Error('❌ Data couldnt be validated')
    }
}

module.exports = {
    validateArticle
}