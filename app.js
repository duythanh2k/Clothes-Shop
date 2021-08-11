var express                 = require("express"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    methodOverride          = require("method-override"),
    flash                   = require("connect-flash"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express(),
    Cloth                   = require("./models/cloth"),
    Comment                 = require("./models/comment"),
    User                    = require("./models/user"),
    seedDB                  = require("./seeds")

//Requiring routes
var clothRoutes             = require("./routes/clothes"),
    commentRoutes           = require("./routes/comments"),
    authRoutes              = require("./routes/index");


mongoose.connect('mongodb://localhost/clothes_shop_v12', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    //"express-session" encode the data into session
	//'secret' used to decode the information that are encoded in the session
    secret: "Every day, every hour. Turn the pain into power.",
    resave: false,
    saveUninitialized: false
}))

//Setting up passport
app.use(passport.initialize());
app.use(passport.session());
//Create new "LocalStrategy", using the "User.authenticate()" method that comming from "passportLocalMongoose"
//So we don't actually have to write the authenticate method either. That's given to us
passport.use(new LocalStrategy(User.authenticate()));
//'serializeUser' used to serializing data and putting it back in the session
passport.serializeUser(User.serializeUser());
//'deserializeUser' responsible for reading the session, taking data from the session that encoded and unencoding it
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.info = req.flash("info");
    res.locals.warning = req.flash("warning");
    next();
});

// seedDB(); //seed the Database


  //===========================//
 //           ROUTES          //
//===========================//

app.use(authRoutes);
app.use("/clothes", clothRoutes);
app.use("/clothes/:id/comments", commentRoutes);



app.listen("3000", function(){
    console.log("Clothes Shop is running on port 3000!");
});