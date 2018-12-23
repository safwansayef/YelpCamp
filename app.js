var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport"),
    localStrategy = require("passport-local");
var Camp = require("./models/campgrounds")
var seedDB = require("./seeds")
var Comment = require("./models/Comment")
var User = require("./models/user")
var methodOverride = require("method-override");
var flash = require("connect-flash");
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp+camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));

// seedDB();//seed DB

app.use(require("express-session")({
    secret:"Liverpool FC",
    resave:"False",
    saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

//makes req.user available to ejs pages as currentUser for authorixation etc.
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error"); 
    res.locals.success =  req.flash("success");
    next();
});

//eliminates need to type in the paths insides quotes in the routes files
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(authRoutes);




          

    
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});