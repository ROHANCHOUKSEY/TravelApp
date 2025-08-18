const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  andhrapradesh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  arunachalpradesh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  assam: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  bihar: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  chhattisgarh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  goa: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  gujarat: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  haryana: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }], 
  himachalpradesh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }], 
  jharkhand: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  karnataka: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }], 
  kerala: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  madhyapradesh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  maharashtra: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  manipur: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  meghalaya: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  mizoram: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }], 
  nagaland: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  odisha: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  punjab: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  rajasthan: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  sikkim: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }], 
  tamilnadu: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  telangana: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  tripura: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  uttarpradesh: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  uttarakhand: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }], 
  westbengal: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }]
});

module.exports = mongoose.model("StateCountryLocation", locationSchema);
