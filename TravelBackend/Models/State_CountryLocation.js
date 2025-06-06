const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  madhyapradesh: { type: Array, default: [] },
  utterpradesh: { type: Array, default: [] },
  maharashtra: { type: Array, default: [] },
  rajasthan: { type: Array, default: [] },
  tamilnadu: { type: Array, default: [] },
  telangana: { type: Array, default: [] },
  karnataka: { type: Array, default: [] },
  uttarakhand: { type: Array, default: [] },
  himachalpradesh: { type: Array, default: [] },
});

module.exports = mongoose.model("StateCountryLocation", locationSchema);
