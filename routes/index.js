var express         = require("express"),
    route           = express.Router(),
    passport        = require("passport"),
    User            = require("../models/user")


//Root route
route.get("/", function(req, res){
    res.render("home");
});

  //=================================//
 //           AUTHENTICATE          //
//=================================//

//Auth routes
route.get("/register", function(req, res){
    res.render("auths/register");
});
//Handling user sign up
route.post("/register", function(req, res){
    // var newUsername = req.body.username;
    // var newPassword = req.body.password;
    var newUser = new User({username: req.body.username});
    //"User.register" take the new user that has the 'username' and hash that password and then store that into the database
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            req.flash("warning", err.message);
            return res.render("auths/register");
        }
        //"passport.authenticate" logged the user in, it takes care of everything in the session
        //it'll run the 'serializeUser' method that we've specified before. And then specifying that we want to use the "local" strategy
        passport.authenticate("local")(req, res, function(){
            req.flash("info", "Welcome to Clothes Shop! " + user.username); //user.username = req.body.username
            res.redirect("/clothes");
        });
    });
});

//Log In routes
route.get("/login", function(req, res){
    res.render("auths/login");
});
//login logic
//middleware "passport.authenticate" compare the 'username' and 'password' we typing in "req.body" with each {user object} in database
route.post("/login", passport.authenticate("local",
    {
        successRedirect: "/clothes",
        failureRedirect: "/login"
    }), function(req, res){
});

//Logout
//when logging out we're not changing anything in the database
//what's happening is that 'passport' is destroying all the user's data in the session
route.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You've been logged out!!");
    res.redirect("/"); 
});



module.exports = route;
