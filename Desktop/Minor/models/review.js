var mongoose = require("mongoose");

var ReviewSchema = new mongoose.Schema({
  id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  text : String,
  author: String,
  rating: Number,
  image: String

});

module.exports = mongoose.model("Review", ReviewSchema);
