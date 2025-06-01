const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  usertype: {
    type: String, 
    required: true,
    enum: ["guest", "host"],
    default: "guest", 
  },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" }],
  hostLocation: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TravelLocation" },
  ],
});

module.exports = mongoose.model("user", userSchema);
