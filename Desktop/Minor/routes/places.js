var express             = require("express"),
    router              = express.Router(),
    mongoose            = require("mongoose"),
    Category            = require("../models/categories"),
    multer              = require("multer"),
    path                = require("path"),
    Image               = require("../models/images"),
    https               = require("https"),
    middleware          = require("../middleware"),
    // multiple_image      = [],
    Place               = require("../models/places");




// Routes

// Place.create({
//     name : "Hyatt",
//     category : "Street Food"
// },
//     function(err, saved){
//         if (err){
//             console.log(err);
//         }
//         else {
//             console.log("saved");
//         }
//     }
// );

router.get("/:category/:id", function(req, res){
      Place.findById(req.params.id)
      .populate("image")
      .populate("comments")
      .exec(function(err, foundPlaces){
        if (err){
          console.log(err);
        }
        else {
          //console.log(foundPlaces);
          res.render("places/show", {place: foundPlaces})
        }
      });
});



router.post("/:category/:id", middleware.isLoggedIn, function(req, res){
    upload(req, res, function(err){

        if(req.files.length == 0){
            if(req.files.length == 0){
                req.flash("error", "Input 1 or more images");
                res.redirect("back");
            }

        } else {
            req.files.forEach(function(file){
                var imageUpload = {
                    path: "uploads/" + file.filename
                }
                Image.create(imageUpload).then(function(newlyadded){
                    if(!newlyadded){
                        console.log("back");
                    } else {
                        Place.findById(req.params.id).then(function(foundPlace){
                            if(!foundPlace){
                                console.log("back");
                            } else {
                                foundPlace.image.push(newlyadded);
                                foundPlace.save();
                                res.redirect("back");

                            }
                        });
                    }
                });
            });
        }
    });
});

//Single Image add more

// router.post("/:category/:id", middleware.isLoggedIn, function(req, res){
//     upload(req, res, function(err){
//         //console.log(req.file)
//         if (err){
//             console.log("err");
//             res.redirect("back")
//         }
//         else {
//
//             var imageUpload = {
//                 path: "uploads/" + req.file.filename
//             }
//         Image.create(imageUpload, function(err, newlyadded){
//             if (err){
//                 console.log(err);
//             }
//             else {
//                 Place.findById(req.params.id, function(err, found){
//                     if (err){
//                         console.log(err);
//                     }
//                     else {
//                         found.image.push(newlyadded);
//                         found.save();
//                         res.redirect("back");
//                     }
//                 });
//             }
//         });
//
//         }
//     });
// });

router.get("/new", middleware.isLoggedIn, function(req, res){
    Category.find({}, function(err, foundCategory){
        if (err){
            console.log(err);
        }
        else {
            //console.log(foundCategory[0].category);
            res.render("places/new", {category: foundCategory[0].category} );
        }
    });
});

//
//
// router.post("/new", middleware.isLoggedIn, function(req, res){
//
//
//
//         var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
//         var url2 = "&key=AIzaSyBSVM0RMI30jf0Jw0Ml9zkekQuq3-ipvnk";
//         var place;
//         var request = https.get(url1+req.body.name+req.body.city+req.body.pincode+url2, function(response){
//           var body = "";
//           response.on("data", function(chunk){
//             body += chunk;
//           });
//           response.on("end", function(){
//              if(response.statusCode === 200){
//                      details = JSON.parse(body);
//
//                     place = {
//                        name: req.body.name,
//                        city: req.body.city,
//                        description: req.body.description,
//                        category: req.body.category,
//                        pincode: req.body.pincode,
//                        author: {
//                            id: req.user._id,
//                            username: req.user.username
//                        },
//                        coordinates: {
//                            lat: details.results[0].geometry.location.lat,
//                            lng: details.results[0].geometry.location.lng
//                        }
//
//                    }
//                     if (details.results[0] == undefined){
//                         place.address = " ";
//                     }
//                     else {
//                         place.address =  details.results[0].formatted_address
//                     }
//
//
//                     Place.create(place).then(function(newlyCreated){
//                         if (!newlyCreated){
//                             console.log(err);
//                         }
//                         else {
//
//                                 upload(req, res, function(err){
//                                     if (err){
//                                         console.log(err);
//                                     }
//                                     else {
//                                         req.files.forEach(function(file){
//
//                                             var imageUpload = {
//                                                 path : "uploads/" + file.filename
//                                             }
//
//                                         Image.create(imageUpload).then(function(newlyupload){
//                                             if(!newlyupload){
//                                                 console.log("error", "Something went wrong!");
//                                             }
//                                             else {
//                                                 newlyCreated.image.push(newlyupload);
//                                                 newlyCreated.save();
//                                                 res.redirect("/" + newlyCreated.category);
//                                             }
//                                         });
//                                     });
//                                     }
//                                 });
//
//
//
//                         }
//
//
//                     });
//                     }
//           });
//         });
//
//
//
//
// });








router.post("/new", middleware.isLoggedIn, function(req, res){
    upload(req, res, function(err){
        if (err){
            console.log(err);
        }
        else {
            req.files.forEach(function(file){

                var imageUpload = {
                    path : "uploads/" + file.filename
                }

            //console.log(uploadImages);
            //console.log(imageUpload);
            Image.create(imageUpload).then(function(newlyupload){
                if(!newlyupload){
                    console.log("error", "Something went wrong!");
                }
                else {
// var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+document.getElementById("name").value + ' ' + document.getElementById("city").value + "&key=AIzaSyBSVM0RMI30jf0Jw0Ml9zkekQuq3-ipvnk";
                    //console.log(req.body.place);

                    var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
                    var url2 = "&key=AIzaSyBSVM0RMI30jf0Jw0Ml9zkekQuq3-ipvnk";
                    var place;
                    var request = https.get(url1+req.body.name+req.body.city+req.body.pincode+url2, function(response){
                      var body = "";
                      response.on("data", function(chunk){
                        body += chunk;
                      });
                      response.on("end", function(){
                         if(response.statusCode === 200){
                                 details = JSON.parse(body);
                                 //console.log(details);
                                // res.render("show", {data: details});
                              //console.log(details.results[0].geometry.location);
                                // return (details.results[0].formatted_address);
                                //console.log(req.body.category);
                                place = {
                                   name: req.body.name,
                                   city: req.body.city,
                                   description: req.body.description,
                                   category: req.body.category,
                                   pincode: req.body.pincode,
                                   author: {
                                       id: req.user._id,
                                       username: req.user.username
                                   },
                                   coordinates: {
                                       lat: details.results[0].geometry.location.lat,
                                       lng: details.results[0].geometry.location.lng
                                   }

                               }
                                if (details.results[0] == undefined){
                                    place.address = " ";
                                }
                                else {
                                    place.address =  details.results[0].formatted_address
                                }


                                Place.create(place).then(function(newlyCreated){
                                    if (!newlyCreated){
                                        console.log(err);
                                    }
                                    else {
                                        //console.log(newlyCreated);
                                        //console.log(newlyupload);
                                        newlyCreated.image.push(newlyupload);
                                        //console.log(newlyCreated);
                                        //console.log(newlyCreated);
                                        //console.log(req.file);
                                        newlyCreated.save();
                                        res.redirect("/" + newlyCreated.category);
                                    }
                                });
                                }
                      });
                    });
                }
            });
        });
        }
    });
});




// add images new page

// router.post("/new", middleware.isLoggedIn, function(req, res){
//     upload(req, res, function(err){
//         if (err){
//             console.log(err);
//         }
//         else {
//                 var imageUpload = {
//                     path : "uploads/" + req.file.filename
//                 }
//
//
//
//             //console.log(uploadImages);
//             //console.log(imageUpload);
//             Image.create(imageUpload, function(err, newlyupload){
//                 if(err){
//                     console.log(err);
//                 }
//                 else {
// // var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+document.getElementById("name").value + ' ' + document.getElementById("city").value + "&key=AIzaSyBSVM0RMI30jf0Jw0Ml9zkekQuq3-ipvnk";
//                     //console.log(req.body.place);
//
//                     var url1 = "https://maps.googleapis.com/maps/api/geocode/json?address=";
//                     var url2 = "&key=AIzaSyBSVM0RMI30jf0Jw0Ml9zkekQuq3-ipvnk";
//                     var place;
//                     var request = https.get(url1+req.body.name+req.body.city+req.body.pincode+url2, function(response){
//                       var body = "";
//                       response.on("data", function(chunk){
//                         body += chunk;
//                       });
//                       response.on("end", function(){
//                          if(response.statusCode === 200){
//                                  details = JSON.parse(body);
//                                  //console.log(details);
//                                 // res.render("show", {data: details});
//                               //console.log(details.results[0].geometry.location);
//                                 // return (details.results[0].formatted_address);
//                                 //console.log(req.body.category);
//                                 place = {
//                                    name: req.body.name,
//                                    city: req.body.city,
//                                    description: req.body.description,
//                                    category: req.body.category,
//                                    pincode: req.body.pincode,
//                                    author: {
//                                        id: req.user._id,
//                                        username: req.user.username
//                                    },
//                                    coordinates: {
//                                        lat: details.results[0].geometry.location.lat,
//                                        lng: details.results[0].geometry.location.lng
//                                    }
//
//                                }
//                                 if (details.results[0] == undefined){
//                                     place.address = " ";
//                                 }
//                                 else {
//                                     place.address =  details.results[0].formatted_address
//                                 }
//
//
//                                 Place.create(place, function(err, newlyCreated){
//                                     if (err){
//                                         console.log(err);
//                                     }
//                                     else {
//                                         //console.log(newlyCreated);
//                                         //console.log(newlyupload);
//                                         newlyCreated.image.push(newlyupload);
//                                         //console.log(newlyCreated);
//                                         //console.log(newlyCreated);
//                                         //console.log(req.file);
//                                         newlyCreated.save();
//                                         res.redirect("/" + newlyCreated.category);
//                                     }
//                                 });
//                                 }
//                       });
//                     });
//                 }
//             });
//         }
//     });
//


    //console.log(req.body.place);

    // Place.create(req.body.place, function(err, newlyCreated){
    //     if (err){
    //         console.log(err);
    //     }
    //     else {
    //         console.log(newlyCreated);
    //         console.log(req.file);
    //         res.redirect("/" + newlyCreated.category);
    //     }
    // });
    // console.log(req.body.place.image)
    // console.log(req.body.place.category)
    // res.redirect("/")
//});

router.get("/:category", function(req, res){
    Place.find({
        category : req.params.category
    })
    .populate("image")
    .exec(function(err, foundPlaces){
        if (err){
            console.log(err);
        }
        else {
            //console.log(foundPlaces);
            res.render("places/index", {places: foundPlaces});
        }
    });


});


const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function(req, file, cb){
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
      }
    });

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
 // }).single("image");
}).array("image", 500);


function checkFileType(file, cb){
    //allowed extensions

    const filetypes =   /jpeg|jpg|png|gif/;
    //check extension extname
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype){
        return cb(null, true);
    }
    else {
        cb("Error: Images only");
    }

}


module.exports = router;
