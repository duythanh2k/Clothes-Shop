var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
//take a bunch of methods that come from 'passportLocalMongoose' that are required to the 'userSchema'
//in order to have "User Authentication"
userSchema.plugin(passportLocalMongoose); //used to hashing, salting and storing thing in the database

module.exports = mongoose.model("User", userSchema);