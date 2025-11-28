const User = require("../Models/user");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.postSignUp = [
  check("firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 character long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name can only contain letters"),
 
  check("lastname")
    .trim() 
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 character long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("Last name can only contain letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail({gmail_remove_dots:false, gmail_remove_subaddress:false}),

  check("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*?<>:{}|<>]/)
    .withMessage("Password must contain at least one special letter"),

  check("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),

  check("usertype")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("Invaliduser type"),

  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and condition");
      }
      return true;
    }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // console.log("Validation errors: ", errors.array());
      return res.status(400).json({ errors: errors.array() });
    } 
    try {
      const { firstname, lastname, email, password, usertype } = req.body;

      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        return res.status(400).json({ message: "email is already exist" });
      }

      bcrypt.hash(password, 12).then(async (hashedPassword) => {
        const newUser = await new User({
          firstname, 
          lastname,
          email,
          password: hashedPassword,
          usertype,
        });

        await newUser.save();
        res.status(200).json(newUser);
      }); 
    } catch (error) {
      console.log("Uers is not SignUp", error);
      res.status(500).json({ message: "Server error" });
    }
  },
];

exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Email not found");
      return res.status(400).json({ message: "Invalid Email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("password not found");
      return res.status(400).json({ message: "Password is invalid" });
    }

    req.session.user = user;
    req.session.isLoggined = true;
    req.session.screenmode = user.screenmode || "light";

    await req.session.save();  
  
    res.status(200).json({ message: "Login successful"});
  } catch (error) {
    console.log("user is not login", error);
  } 
};

exports.postScreenmode = async (req, res, next) => {
  const { mode } = req.body;
  try {
    req.session.screenmode = mode;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    user.screenmode = mode;
    await user.save();
    res.status(200).json({ message: "Screen mode saved" });
  } catch (error) {
    console.log("screen mode is not saved in database", error);
    res.status(500).json({ message: "Failed to save screen mode" });
  }
};
 
exports.getScreenmode = async (req, res, next) => {
  try {
    if (!req.session.user || !req.session.user._id) {
      return res.status(401).json({ message: "User not logged in" });
    }
    const userId = req.session.user._id;
    // console.log("userId", userId)
    const user = await User.findById(userId); 
    const screenmode = user.screenmode || "light";
    res.status(200).json(screenmode);
  } catch (error) {
    console.log("not get screenmode from database", error);
    res.status(500).json({ message: "Failed to get screen mode" });
  }
};

// Add this to your AuthController
exports.postLogout = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    // req.session.screenmode = 'light';
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Logout successful" });
  });
};
