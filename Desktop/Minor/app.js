var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser")
    mongoose            = require("mongoose");
    User                = require("./models/user"),
    multer              = require("multer"),
    flash               = require("connect-flash"),
    passport            = require("passport"),
    passportSetup       = require("./config/passport-setup"),
    LocalStrategy       = require("passport-local"),
    Category            = require("./models/categories"),
    category            = [],
    Review              = require("./models/review");


var indexRoutes  = require("./routes/index"),
    reviewRoutes = require("./routes/review"),
    placesRoutes = require("./routes/places");

mongoose.connect("mongodb://localhost/my_review");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());



app.use(require("express-session")({
    secret: "Life's like it",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Category.create({
//   category: ["Hotel", "Motel", "Restaurants", "shops"]
// }, function(err, saved){
//   if(err){
//     console.log(err);
//   }
// });

Category.find({}).then(function(allCategory){
  category = allCategory[0].category;
  // console.log(category);
  app.use(function(req, res, next){
    res.locals.cateogry = category;
  })
});


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


app.use(indexRoutes);
app.use(placesRoutes);
app.use(reviewRoutes);

// Routes

app.listen("7000", function(){
  console.log("server running at port 7000");
});
