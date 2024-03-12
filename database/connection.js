const mongoose = require('mongoose')

const connection = async() =>   {
    try{
        await mongoose.connect(`mongodb+srv://rubenmartinez:quxca5-Fahrof-dobfeh@cluster0.zfkgcek.mongodb.net/mi_blog`)
        console.log("✅ Connected to database 'Blog'")
    } catch(error)  {
        console.log(error)
        throw new Error("❌ Connection with database failed")
    }
}

module.exports = {
    connection
}