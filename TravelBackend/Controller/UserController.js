const FavouriteLocation = require("../Models/FavoutitesLocation");
const TravelLocations = require("../Models/TravelLocation");

exports.postFavourite = async (req, res, next) => {
  try {
    const { Locationid } = req.body;

    const existingFav = await FavouriteLocation.findOne({ Locationid });

    if (existingFav) {
      return res.status(409).json({ message: "Already in favourite" });
    }

    const newFavId = await new FavouriteLocation({ Locationid });
    await newFavId.save();
    res.status(200).json(newFavId);
  } catch (error) {
    console.log("Favourite is not assign");
  }
};

exports.getFavourites = async (req, res, next) => {
  try {
    const favourites = await FavouriteLocation.find();
    const locationIds = favourites.map((fav) => fav.Locationid);
    const locations = await TravelLocations.find({ _id: { $in: locationIds } });

    res.status(200).json(locations);
  } catch (error) {
    console.log("Favourite is not get from server");
  }
};

exports.deleteFavourites = async (req, res, next) => {
  try {
    console.log("favourite Id", req.params);
    const { id } = req.params;
    const deleteFavourite = await FavouriteLocation.findOneAndDelete({
      Locationid: id,
    });
    res.status(200).json(deleteFavourite);
  } catch (error) {
    console.log("Favourite is not delete");
  }
};
