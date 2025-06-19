const TravelLocations = require("../Models/TravelLocation");
const user = require("../Models/user");
const locationState = require("../Models/State_CountryLocation");
// const { default: mongoose } = require("mongoose");
const path = require("path");
const fs = require("fs");

exports.postLocation = async (req, res, next) => {
  // console.log(req.body);
  try {
    const {
      image,
      locationName,
      country,
      state,
      rating,
      description,
      holeDescription,
      history,
      VisitorTips,
      timing,
      closing,
    } = req.body;
    const newLocation = new TravelLocations({
      image,
      locationName,
      country,
      state,
      rating,
      description,
      holeDescription,
      history,
      VisitorTips,
      timing,
      closing,
    });

    await newLocation.save();

    console.log("FromLocation", state);

    const userId = req.session.user._id;
    const User = await user.findById(userId);
    User.hostLocation.push(newLocation._id);
    await User.save();

    const stateKey = state.toLowerCase().replace(/\s/g, "");

    let stateDoc = await locationState.findOne();
    if (!stateDoc) {
      stateDoc = new locationState({});
      await stateDoc.save();
    }

    if (!stateDoc[stateKey].includes(newLocation._id)) {
      stateDoc[stateKey].push(newLocation._id);
      await stateDoc.save();
    }

    res.status(200).json(newLocation);
  } catch (error) {
    console.log("Data is not assign in database", error);
  }
};

exports.getHostLocation = async (req, res, next) => {
  try {
    const userId = req.session.user._id;

    const User = await user.findById(userId).populate("hostLocation");

    const getLocations = User.hostLocation;

    res.status(200).json(getLocations);
  } catch (error) {
    console.log("Host Data is not fetched from database", error);
    res.status(500).json({ message: "Failed to fetch host locations" });
  }
};

exports.getLocation = async (req, res, next) => {
  try {
    const getLocations = await TravelLocations.find(req.body);
    res.status(200).json(getLocations);
  } catch (error) {
    console.log("Data is not fetch from database");
  }
};

exports.postStateLocation = async (req, res) => {
  try {
    const { locationName, state } = req.body;

    const stateKey = state.toLowerCase().replace(/\s/g, "");

    console.log("stateKeyFromState", stateKey);

    const allowedstate = [
      "andhrapradesh",
      "arunachalpradesh",
      "assam",
      "bihar",
      "chhattisgarh",
      "goa",
      "gujarat",
      "haryana",
      "himachalpradesh",
      "jharkhand",
      "karnataka",
      "kerala",
      "madhyapradesh",
      "maharashtra",
      "manipur",
      "meghalaya",
      "mizoram",
      "nagaland",
      "odisha",
      "punjab",
      "rajasthan",
      "sikkim",
      "tamilnadu",
      "telangana",
      "tripura",
      "uttarpradesh",
      "uttarakhand",
      "westbengal",
    ];

    if (!allowedstate.includes(stateKey)) {
      return res
        .status(404)
        .json({ message: ` message: Invalid state name: ${state}.` });
    }

    const existingLocation = await TravelLocations.findOne({
      locationName,
      state,
    });

    if (!existingLocation) {
      return res.status(404).json({
        message: "Location not found in TravelLocations. Please add it first.",
      });
    }

    let stateDoc = await locationState.findOne();

    if (!stateDoc) {
      stateDoc = new locationState({
        andhrapradesh: [],
        arunachalpradesh: [],
        assam: [],
        bihar: [],
        chhattisgarh: [],
        goa: [],
        gujarat: [],
        haryana: [],
        himachalpradesh: [],
        jharkhand: [],
        karnataka: [],
        kerala: [],
        madhyapradesh: [],
        maharashtra: [],
        manipur: [],
        meghalaya: [],
        mizoram: [],
        nagaland: [],
        odisha: [],
        punjab: [],
        rajasthan: [],
        sikkim: [],
        tamilnadu: [],
        telangana: [],
        tripura: [],
        uttarpradesh: [],
        uttarakhand: [],
        westbengal: [],
      });
      await stateDoc.save();
    }

    const alreadyExist = stateDoc[stateKey].some(
      (id) => id.toString() === existingLocation._id.toString()
    );

    if (alreadyExist) {
      return res
        .status(409)
        .json({ message: "Location already added to this state." });
    }

    stateDoc[stateKey].push(existingLocation._id);

    const updateDoc = await stateDoc.save();

    res.status(200).json({
      message: "Existing location ID stored in state successfully",
      data: updateDoc,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to save location to state" });
    console.log("Error during save location in state", error);
  }
};

exports.getStateLocation = async (req, res, next) => {
  try {
    const getlocationState = await locationState
      .find()
      .populate("andhrapradesh")
      .populate("arunachalpradesh")
      .populate("assam")
      .populate("bihar")
      .populate("chhattisgarh")
      .populate("goa")
      .populate("gujarat")
      .populate("haryana")
      .populate("himachalpradesh")
      .populate("jharkhand")
      .populate("karnataka")
      .populate("kerala")
      .populate("madhyapradesh")
      .populate("maharashtra")
      .populate("manipur")
      .populate("meghalaya")
      .populate("mizoram")
      .populate("nagaland")
      .populate("odisha")
      .populate("punjab")
      .populate("rajasthan")
      .populate("sikkim")
      .populate("tamilnadu")
      .populate("telangana")
      .populate("tripura")
      .populate("uttarpradesh")
      .populate("uttarakhand")
      .populate("westbengal");

    res.status(200).json(getlocationState);
  } catch (error) {
    console.log("not get statelocation data", error);
    res.status(500).json({ message: "Error getting state location data" });
  }
};

exports.getEditLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editLocation = await TravelLocations.findById(id);
    res.status(200).json(editLocation);
  } catch (error) {
    console.log("Edit Location is not get", error);
  }
};

exports.postEditLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("updateLocationId", id);
    const {
      image,
      locationName,
      country,
      state,
      rating,
      description,
      holeDescription,
      history,
      VisitorTips,
      timing,
      closing,
    } = req.body;

    const oldLocation = await TravelLocations.findById(id);
    const imgurl = oldLocation.image;

    const updateLocation = await TravelLocations.findByIdAndUpdate(
      id,
      {
        image,
        locationName,
        country,
        state,
        rating,
        description,
        holeDescription,
        history,
        VisitorTips,
        timing,
        closing,
      },
      { new: true }
    );
    await updateLocation.save();

    if (oldLocation.image) {
      const filename = imgurl[0].split("/").pop();
      const filepath = path.join(__dirname, "../uploads", filename);
      fs.unlink(filepath, (err) => {
        if (err) {
          console.log("LastImage is not remove from upload");
        } else {
          console.log("LastImage is remove from upload");
        }
      });
    }

    res.status(200).json(updateLocation);
  } catch (error) {
    console.log("Edit data is not post in database", error);
  }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;

    // First, find the location
    const deletedLocation = await TravelLocations.findByIdAndDelete(id);

    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found" });
    }

    const userId = req.session.user._id;
    const User = await user.findById(userId);

    if (User.hostLocation.includes(id)) {
      User.hostLocation = User.hostLocation.filter(
        (locationId) => locationId.toString() !== id
      );
      await User.save();
    }

    if (deletedLocation.image) {
      const imageUrl = deletedLocation.image;
      const filename = imageUrl[0].split("/").pop();
      const filePath = path.join(__dirname, "../uploads", filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting image:", filename, err);
        } else {
          console.log("Deleted image:", filename);
        }
      });
    }

    res.status(200).json({ _id: id });
  } catch (error) {
    console.log("Data is not deleted from database", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
