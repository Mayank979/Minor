var mongoose                    = require("mongoose"),
    passportLocalMongoose       = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    // email : {
    //   // type : mongoose.SchemaTypes.Email,
    //   type : String,
    //   required : true
    //         },
    username : String,
    password: String,
    googleId: String,
    name: String,
    email: String,
    image: String,
}, {strict: false});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
