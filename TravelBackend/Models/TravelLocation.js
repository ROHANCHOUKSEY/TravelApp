const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
    image: {type:String},
    locationName: {type:String},
    country: {type:String},
    rating: {type: Number},
    description: {type: String}
});

module.exports = mongoose.model("TravelLocation", LocationSchema); 