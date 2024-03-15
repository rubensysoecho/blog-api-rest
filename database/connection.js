const mongoose = require('mongoose')
require('dotenv').config()

const connection = async() =>   {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWD}@cluster0.zfkgcek.mongodb.net/mi_blog`)
        console.log("✅ Connected to database 'Blog'")
    } catch(error)  {
        console.log(error)
        throw new Error("❌ Connection with database failed")
    }
}

module.exports = {
    connection
}