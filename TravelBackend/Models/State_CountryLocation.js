const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  madhyapradesh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  utterpradesh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  maharashtra: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  rajasthan: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  tamilnadu: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  telangana: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  karnataka: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  uttarakhand: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  himachalpradesh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
});

module.exports = mongoose.model("StateCountryLocation", locationSchema);
