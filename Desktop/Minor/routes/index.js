var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user"),
    Place       = require("../models/places"),
    Category    = require("../models/categories");

// Routes
//
// Category.create({
//   category: [
//     "Electronics",
//     "hospitals",
//     "Malls",
//     "Streets",
//     "Street Food"
//   ],
//   name: "Category"
// },
//     function(err, category){
//       if(err){
//         console.log(err);
//       }
//       else {
//         console.log(category);
//       }
//     }
// )


//Routes


router.get("/", function(req, res){
    if (req.query.search){
      if(req.query.search.length >= 3){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Place.find({name: regex})
        .populate("image")
        .exec(function(err, found){
            if(err){
                console.log(err);
            }
            else {

                  res.render("search", {places: found, searchedFor: req.query.search});
                }
        });
    } else {
      req.flash("error", "Atleast write 3 characters");
      res.redirect("/");
    }

  }
    else {
        Category.find({}, function(err, found){
            if(err){
                console.log(err);
            }
            else {
              //  console.log(found);
                res.render("home", {Category: found});
            }
        });
      }
});




// router.get("/register",  function(req, res){
//   res.render("index/register");
// });

router.post("/register", function(req, res){
  var newUser = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    image: "default/defaultimg.png"

  });
  console.log(newUser);
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      req.flash("error", err.message);
      return res.redirect("/");
    }
    passport.authenticate("local")(req, res, function(){
      req.flash("success", "You are officially a Flutteree : " + user.username)
      res.redirect("/");
    });
  });
});

router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

// callback rorutes for gogle to redirect

router.get("/google/redirect", passport.authenticate("google"), function(req, res){
  res.redirect("/");
});

//
// router.get("/login", function(req, res){
//   res.render("index/login");
// });

router.post("/login", passport.authenticate("local",
  {
  successRedirect: "back",
  failureRedirect: "/"
}
), function(req, res){
});


router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Logged you out!");
  res.redirect("/");
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;
