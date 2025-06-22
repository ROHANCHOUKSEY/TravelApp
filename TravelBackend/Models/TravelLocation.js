const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
    image: [{type:String}],
    locationName: {type:String},
    country: {type:String},
    state: {type:String},
    rating: {type: Number},
    description: {type: String},
    holeDescription: {type: String}, 
    history: {type: String},
    VisitorTips: {type: String},
    timing: {type: String},
    closing: {type: String},
    review: [{
        text:{type: String, required: true},
        postuserName: {type: String, required: true}, 
        createdAt: {type: String, requires: true}
    }]
});

module.exports = mongoose.model("TravelLocation", LocationSchema);     