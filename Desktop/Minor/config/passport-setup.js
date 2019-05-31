const passport        = require("passport");
const GoogleStratey   = require("passport-google-oauth20");
const keys            = require("./keys");
const User            = require("../models/user");

passport.serializeUser(function(user, done){
  done(null, user.id)
})

passport.deserializeUser(function(id, done){
  User.findById(id).then(function(user){
    done(null, user)
  });

})


passport.use(
  new GoogleStratey({
  //options for strategy
  callbackURL: "/google/redirect",
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret
}, function(accessToken, refreshToken, profile, done){
      //passport callback function

      // check if user already exists in debug db
      //console.log(accessToken);
      User.findOne({googleId: profile.id}).then(function(currentUser){
        if(currentUser){
          // user already exists
          //console.log("already exists");
          //console.log(currentUser);
          done(null, currentUser);
        } else {
          // create new user
          var user = {
            username: profile.displayName,
            googleId: profile.id,
            image: profile._json.image.url
          }
          User.create(user, function(err, userSaved){
            if(err){
              console.log(err);
            }
            // console.log(userSaved);
            done(null, userSaved);
          });
        }
      });
    })
 )
