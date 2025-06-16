const TravelLocations = require("../Models/TravelLocation");
const user = require("../Models/user");
const locationState = require("../Models/State_CountryLocation");
const { default: mongoose } = require("mongoose");

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
    // console.log("HostLocation: ", User.hostLocation);
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

exports.postStateLocation = async (req, res) => {
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

    const existingLocation = await TravelLocations.findOne({
      locationName,
      state,
    });

    if (!existingLocation) {
      return res.status(404).json({
        message: "Location not found in TravelLocations. Please add it first.",
      });
    }

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

    let stateDoc = await locationState.findOne();
    if (!stateDoc) {
      stateDoc = new locationState();
    }

    stateDoc[statekey].push(newLocation._id);
    const updatedDoc = await stateDoc.save();

    res.status(200).json({
      message: "Location ID stored in state successfully",
      data: updatedDoc,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Failed to save location", error: error.message });
  }
};

// exports.postStateLocation = async (req, res) => {
//   try {
//     const { locationName, state } = req.body;

//     const statekey = state.toLowerCase().replace(/\s+/g, "");

//     const allowedStates = [
//       "madhyapradesh",
//       "utterpradesh",
//       "maharashtra",
//       "rajasthan",
//       "tamilnadu",
//       "telangana",
//       "karnataka",
//       "uttarakhand",
//       "himachalpradesh",
//     ];

//     if (!allowedStates.includes(statekey)) {
//       return res.status(400).json({ message: `Invalid state name: ${state}` });
//     }

//     // ✅ Step 1: Find the existing location by name and state
//     const existingLocation = await TravelLocations.findOne({
//       locationName,
//       state,
//     });

//     if (!existingLocation) {
//       return res.status(404).json({
//         message: "Location not found in TravelLocations. Please add it first.",
//       });
//     }

//     // ✅ Step 2: Find or create the locationState document
//     let stateDoc = await locationState.findOne();
//     if (!stateDoc) {
//       stateDoc = new locationState(); // creates an empty doc with all state arrays
//     }

//     // ✅ Step 3: Prevent duplicate ID in state array
//     const alreadyExists = stateDoc[statekey].some(
//       (id) => id.toString() === existingLocation._id.toString()
//     );
//     if (alreadyExists) {
//       return res
//         .status(409)
//         .json({ message: "Location already added to this state." });
//     }

//     // ✅ Step 4: Push the existing location's ID
//     stateDoc[statekey].push(existingLocation._id);
//     const updatedDoc = await stateDoc.save();

//     // ✅ Step 5: Return success
//     res.status(200).json({
//       message: "Existing location ID stored in state successfully",
//       data: updatedDoc,
//     });
//   } catch (error) {
//     console.error("Error saving location to state:", error);
//     res.status(500).json({
//       message: "Failed to save location to state",
//       error: error.message,
//     });
//   }
// };

exports.getStateLocation = async (req, res, next) => {
  try {
    const getlocationState = await locationState
      .find()
      .populate("madhyapradesh")
      .populate("utterpradesh")
      .populate("maharashtra")
      .populate("rajasthan")
      .populate("tamilnadu")
      .populate("telangana")
      .populate("karnataka")
      .populate("uttarakhand")
      .populate("himachalpradesh");

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
 