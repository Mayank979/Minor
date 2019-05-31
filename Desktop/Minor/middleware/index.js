
var middlewareObj = {},
    Place      = require("../models/places"),
    review     = require("../models/review");

middlewareObj.isLoggedIn = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
      req.flash("error", "You need to be logged in to do that!")
      res.redirect("back");
}


module.exports = middlewareObj;
