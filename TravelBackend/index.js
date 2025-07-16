const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const hostRouter = require("./Router/HostRouter");
const userRouter = require("./Router/UserRouter");
const authRouter = require("./Router/AuthRouter");

const app = express();

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Multer + Cloudinary setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "travelApp",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});
const upload = multer({ storage });

// ✅ MongoDB session store
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "session",
});

// ✅ Middleware setup
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  session({
    secret: "rohanchouksey",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false, // Set to true if using https
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongoose connection error:", err));

// ✅ Routes
app.use("/auth", authRouter);
app.use("/api/host", hostRouter);
app.use("/api/user", userRouter);

app.post("/api/upload", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const fileUrls = req.files.map((file) => file.path); // Cloudinary URL
  res.status(200).json({ imageUrls: fileUrls });
});

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Backend is live!");
});

// ⛔️ DO NOT start server here (no app.listen on Vercel)
module.exports = app;
