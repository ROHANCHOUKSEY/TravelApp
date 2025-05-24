const User = require("../Models/user");

exports.postAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await new User({ email, password });
    await newUser.save();
    res.status(200).json(newUser);  
  } catch (error) {
    console.log("userdata is not save", error);
  }
};
 