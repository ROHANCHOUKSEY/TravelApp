const mongoose = require("mongoose");

const FavouritesSchema = mongoose.Schema({
    Locationid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TravelLocation",
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("FavouriteLocation", FavouritesSchema);   