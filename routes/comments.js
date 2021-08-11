const comment = require("../models/comment");

var express         = require("express"),
    route           = express.Router({mergeParams: true}), //merging an ID from "app.js" to this route
    Cloth           = require("../models/cloth"),
    Comment         = require("../models/comment"),
    middleware      = require("../middleware")

  //===========================//
 //          COMMENT          //
//===========================//

//NEW Comment
route.get("/new", middleware.isLoggedIn, function(req, res){
    Cloth.findById(req.params.id, function(err, foundCloth){
        if (err) {
            req.flash("warning", "Cloth not found!");
            console.log(err);
        }
        else {
            res.render("comments/new", {cloth: foundCloth});
        }
    });
});

//CREATE Comment
route.post("/", middleware.isLoggedIn, function(req, res) {
    Cloth.findById(req.params.id, function(err, foundCloth){
        if (err) {
            req.flash("warning", "Cloth not found!");
            res.redirect("/clothes");
        }
        else {
            var newComment = req.body.comment;
            let createdTime = new Date();
            newComment.time = createdTime;

            Comment.create(newComment, function(err, createdComment){
                if (err) {
                    req.flash("warning", "Something went wrong!");
                    console.log(err);
                }
                else {
                    //add username and id to comment
                    createdComment.author.id = req.user._id;
                    createdComment.author.username = req.user.username;
                    //save comment
                    createdComment.save();
                    foundCloth.comments.push(createdComment);
                    foundCloth.save();

                    res.redirect("/clothes/" + foundCloth._id);
                }
            });
        }
    });
});

//EDIT Comment
route.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            req.flash("warning", "Comment not found!");
            res.redirect("back");
        }
        else {
            res.render("comments/edit", {cloth_id: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE Comment
route.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //anything.findByIdAndUpdate(id, newData, callback)

    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, newComment){
        if (err) {
            req.flash("warning", "Comment not found!");
            res.redirect("back");
        }
        else {
            res.redirect("/clothes/" + req.params.id);
        }
    });
});

//DELETE Comment
route.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){

    Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
            req.flash("warning", "Comment not found!");
			res.redirect("back");
		}
		else{
			//req.flash("success", "Comment Deleted!");
			res.redirect("/clothes/" + req.params.id);
		}
	});
});



module.exports = route;
