const TravelLocations = require("../Models/TravelLocation");
const user = require("../Models/user");
const locationState = require("../Models/State_CountryLocation");
const { default: mongoose } = require("mongoose");

exports.postLocation = async (req, res, next) => {
  console.log(req.body);
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
      timing,
      closing,
    });

    await newLocation.save();

    const userId = req.session.user._id;
    const User = await user.findById(userId);
    User.hostLocation.push(newLocation._id);
    console.log("HostLocation: ", User.hostLocation);
    await User.save();
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

exports.getEditLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const editLocation = await TravelLocations.findById(id);
    res.status(200).json(editLocation);
  } catch (error) {
    console.log("Edit Location is not get", error);
  }
};

exports.postStateLocation = async (req, res, next) => {
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
      timing,
      closing,
    } = req.body;

    const statekey = state.toLowerCase().replace(/\s+/g, "");

    // Check if the statekey is valid in the schema
    const allowedStates = [
      "madhyapradesh",
      "utterpradesh",
      "maharashtra",
      "rajasthan",
      "tamilnadu",
      "telangana",
      "karnataka",
      "uttarakhand",
      "himachalpradesh",
    ];

    if (!allowedStates.includes(statekey)) {
      return res.status(400).json({ message: `Invalid state name: ${state}` });
    }

    // Make sure a document exists (initialize if not)
    let doc = await locationState.findOne({});
    if (!doc) {
      doc = await locationState.create({
        madhyapradesh: [],
        utterpradesh: [],
        maharashtra: [],
        rajasthan: [],
        tamilnadu: [],
        telangana: [],
        karnataka: [],
        uttarakhand: [],
        himachalpradesh: [],
      });
      await doc.save();
    }

    // Create the new location object
    const newLocation = {
      image,
      locationName,
      country,
      state,
      rating,
      description,
      holeDescription,
      history,
      timing,
      closing,
    };

    // Push the new location to the appropriate state array
    doc[statekey].push(newLocation);
    await doc.save();

    res.status(200).json({ message: "Location saved", data: updatedDoc });
  } catch (error) {
    console.log("Location is not saved state", error);
    res
      .status(500)
      .json({ message: "Error saving location", error: error.message });
  }
};

exports.getStateLocation = async (req, res, next) => {
  try {
    const getStateLocation = await locationState.find();
    req.status(200).json(getStateLocation);
  } catch (error) {
    console.log("not get statelocation data", error);
  }
};

exports.postEditLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      image,
      locationName,
      country,
      state,
      rating,
      description,
      holeDescription,
      history,
      timing,
      closing,
    } = req.body;
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
        timing,
        closing,
      },
      { new: true }
    );
    await updateLocation.save();
    res.status(200).json(updateLocation);
  } catch (error) {
    console.log("Edit data is not post in database", error);
  }
};

exports.deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TravelLocations.findByIdAndDelete(id);
    res.status(200).json({ _id: id });
  } catch (error) {
    console.log("Data is not delete from database");
  }
};
