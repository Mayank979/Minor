var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
  path: String
});

module.exports = mongoose.model("image", imageSchema)
