//Named this middleware file as "index.js", because it's a special name
//When we  require a directory, it's automatically require the context of "index.js", that's suppose to be like the main file where other thing are required
//When require this file you just require the directory that this file is belong to. Like 'require("./directory")', don't have to specify 'require("./directory/index.js")'
var Cloth = require("../models/cloth");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkClothOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Cloth.findById(req.params.id, function(err, foundCloth){
            if (err) {
                req.flash("warning", "Cloth not found!");
                res.redirect("back");
            }
            else {
                //"foundCloth.author.id" is a mongoose object
                //"req.user._id" is a String
                if (foundCloth.author.id.equals(req.user._id)) { //"equals" method is to compare 2 different type
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that!!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "You need to be logged in to do that!!");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                req.flash("warning", "Comment not found!");
                res.redirect("back");
            }
            else {
                //does the current user own this comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that!!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "You need to be logged in to do that!!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!!");
    res.redirect("/login");
}


module.exports = middlewareObj;
