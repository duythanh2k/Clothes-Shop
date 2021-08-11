var express         = require("express"),
    route           = express.Router(),
    Cloth           = require("../models/cloth"),
    middleware      = require("../middleware")


// var clothes = [
//     {name: "Nike Court Cargo Joggers", image: "https://images.asos-media.com/products/nike-court-cargo-joggers-in-white/22561662-1-white?$n_480w$&wid=476&fit=constrain"},
//     {name: "Nike Wikd Futura", image: "https://images.asos-media.com/products/nike-wild-futura-long-sleeve-t-shirt-in-white/23613299-1-white?$n_480w$&wid=476&fit=constrain"},
//     {name: "1/4 Zip Long Steve Top in Black", image: "https://images.asos-media.com/products/hiit-running-1-4-zip-long-sleeve-top-in-black/22863369-1-blackmarl?$n_480w$&wid=476&fit=constrain"},
//     {name: "Low Lace Dress US", image: "https://images.jdmagicbox.com/quickquotes/images_main/b07n7vbjgp-sttech1-women-clothes-women-s-double-v-neck-strapless-slim-cocktail-high-low-lace-dress-us-size-xs-tag-s-pink-165890576-el6z6.jpg"},
//     {name: "One Shoulder Lace Cocktail", image: "https://images.jdmagicbox.com/quickquotes/images_main/b07n6k6lcc-sttech1-women-clothes-women-s-one-shoulder-lace-cocktail-evening-dress-solid-short-bow-bridesmaid-dress-us-size-m-tag-l-white-165888280-9bjjm.jpg"},
//     {name: "Jacket Autumn Winter Casual", image: "https://images-na.ssl-images-amazon.com/images/I/51LdBwe8IfL._UX569_.jpg"},
//     {name: "Goose Bumb Crop Top", image: "https://i.pinimg.com/originals/7b/19/97/7b199733a7cc2408eac52e955129763b.jpg"}
// ];

  //============================//
 //           CLOTHES          //
//============================//


//INDEX - show all clothes
route.get("/", function(req, res){
    Cloth.find({}, function(err, clothes){
        if(err){
            req.flash("warning", "Something went wrong!");
            console.log(err);
        } 
        else{
            //res.render(".ejs", obj{name to give it (can be anything): data passing in})
            res.render("clothes/index", {clothes: clothes});
        }
    });
});

//CREATE - add new cloth to DB
route.post("/", middleware.isLoggedIn, function(req, res){
    var newCloth = req.body.cloth;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    newCloth.author = author;
    // console.log(req.user)
    //create a new cloth and add it to the database
    Cloth.create(newCloth, function(err, createdCloth){
        if(err){
            console.log(err);
        }
        else{
            //redirect back to clothes page
            res.redirect("/clothes");
        }
    });
    
});

//NEW - show form to create new cloth
route.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("clothes/new");
});

//SHOW - show more info about one cloth
route.get("/:id", function(req, res){
    //find the cloth with provided ID
    //anything.findById(ID, callback)
    //populating comment and executing the callback
    Cloth.findById(req.params.id).populate("comments").exec(function(err, foundCloth){
        if (err) {
            req.flash("warning", "Cloth not found!");
            console.log(err);
        }
        else {
            //render show template with that cloth
            res.render("clothes/show", {cloth: foundCloth});
        }
    });
});

//EDIT - show form to edit a cloth
route.get("/:id/edit", middleware.checkClothOwnership, function(req, res){
    Cloth.findById(req.params.id, function(err, foundCloth){
        if (err) {
            req.flash("warning", "Cloth not found!");
            console.log(err);
        }
        else {
            res.render("clothes/edit", {cloth: foundCloth});
        }
    });
});

//UPDATE - update a cloth and add it to database
route.put("/:id", middleware.checkClothOwnership, function(req, res){
    //anything.findByIdAndUpdate(id, newData, callback)
    Cloth.findByIdAndUpdate(req.params.id, req.body.cloth, function(err, updatedCloth){
        if (err) {
            req.flash("warning", "Cloth not found!");
            res.redirect("/clothes");
        }
        else {
            res.redirect("/clothes/" + req.params.id);
        }
    });
});

//DELETE - destroy a chosen cloth
route.delete("/:id", middleware.checkClothOwnership, function(req, res){
    //destroy a cloth
    Cloth.findByIdAndDelete(req.params.id, function(err){
        if (err) {
            req.flash("warning", "Cloth not found!");
            res.redirect("/clothes");
        }
        else {
            //redirect somewhere
            res.redirect("/clothes");
        }
    });
});



module.exports = route;
