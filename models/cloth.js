var mongoose = require("mongoose");

//SCHEMA SETUP
//clothSchema is a bluesprint of a singular 'cloth'
var clothSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    brand: String,
    description: String,
    size: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
//Compiling this clothSchema in to a model
//"Cloth" is a name of a singular version of a model
//export a 'Cloth' object to "module.exports" to use it somewhere with 'require("cloth")'
module.exports = mongoose.model("Cloth", clothSchema);