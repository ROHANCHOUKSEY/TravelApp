const TravelLocations = require("../Models/TravelLocation");
const user = require("../Models/user");

exports.getDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const detailLocation = await TravelLocations.findById(id);
    console.log("Details from server: ", detailLocation);
    res.status(200).json(detailLocation);
  } catch (error) {
    console.log("Location details not get");
  }
};

exports.postFavourite = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const { Locationid } = req.body;
    const User = await user.findById(userId);
    if (!User.favourites.includes(Locationid)) {
      User.favourites.push(Locationid);
      await User.save();
      res.status(200).json({ message: "Favourite save" });
    }
  } catch (error) {
    console.log("Favourite is not assigned", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getFavourites = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const favourite = await user.findById(userId).populate("favourites");
    res.status(200).json(favourite.favourites);
  } catch (error) {
    console.log("Favourite is not get from server");
  }
};
 
exports.deleteFavourites = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.session.user._id;
    const User = await user.findById(userId);
    if (User.favourites.includes(id)) {
      User.favourites = User.favourites.filter((fav) => fav.toString() !== id);
      await User.save();
      res.status(200).json({ message: "favourite delete" });
    }
    
  } catch (error) {
    console.log("Favourite is not delete");
  }
};

exports.reviewPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text, postuserName, createdAt } = req.body;
    const travellocation = await TravelLocations.findById(id);
    const newReview = { text, postuserName, createdAt };
    travellocation.review.push(newReview);
    await travellocation.save();
    res.status(200).json({
      message: "Review posted successfully",
      updatelocation: travellocation,
    });
  } catch (error) {
    console.log("Error during post review", error);
    res.status(400).json({ message: "Error to post review" });
  }
};

exports.reviewGet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getLocationReview = await TravelLocations.findById(id);
    if (!getLocationReview) {
      return res.status(402).json({ message: "Location is not found" });
    }
    const getReview = getLocationReview.review;
    res
      .status(200)
      .json({ message: "Review get successfully", LocationReview: getReview });
  } catch (error) {
    console.log("There is something wrong to get review", error);
  }
};
