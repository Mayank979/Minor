var mongoose = require("mongoose");

var placesSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  description : String,
  city: {
    type : String,
    required: true
  },
  address: String,
  rating: Number,
  pincode: Number,
  coordinates : {
    lat: Number,
    lng: Number
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review"
      }
    ],
   category : String,
   image: [
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "image"
     }
   ]
});

module.exports = mongoose.model("Place", placesSchema);
