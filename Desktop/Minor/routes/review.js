var express       = require("express"),
    router        = express.Router(),
    // mongoose      = require("mongoose"),
    Place         = require("../models/places"),
    middleware    = require("../middleware"),
    Review        = require("../models/review");


// Review routes


router.post("/:category/:id/review/new", middleware.isLoggedIn, function(req, res){
        // console.log(req.body.comment);
        Place.findById(req.params.id, function(err, foundPlace){
            if (err){
                console.log(err);
            }
            else {
              if(req.body.comment.text.length < 5){
                  req.flash("error", "Review length should be greater than 5 characters");
                  res.redirect("back")
              } else {

                Review.create(req.body.comment, function(err, createdReview){
                    if (err){
                        console.log(err);
                    }
                    else {
                        createdReview.id = req.user._id;
                        createdReview.author = req.user.username;
                        createdReview.image = req.user.image;
                        createdReview.save();
                        foundPlace.comments.push(createdReview);
                        // console.log(createdReview);
                        if(!foundPlace.rating){
                            foundPlace.rating = createdReview.rating;
                        } else {
                            foundPlace.rating = (createdReview.rating + foundPlace.rating)/2;
                        }
                        // console.log(foundPlace.rating);
                        foundPlace.save();
                        res.redirect("/" + req.params.category + "/" + req.params.id);
                    }
                });
               }
            }
        });
});















module.exports = router;
