var mongoose = require("mongoose");

var categorySchema = mongoose.Schema({
    category : [String],
    name : String
});

module.exports = mongoose.model("category", categorySchema);
