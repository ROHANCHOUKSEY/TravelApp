const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const path = require("path");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const cors = require("cors");
const hostRouter = require("./Router/HostRouter");
const userRouter = require("./Router/UserRouter");
const authRouter = require("./Router/AuthRouter");
const { error } = require("console");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "travelApp",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// const DB_PATH = process.env.MONGO_URI;

const store = new mongodbStore({
  uri: process.env.MONGO_URI,
  collection: "session",
});

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/uploads", express.static("uploads"));

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "rohanchouksey",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      httpOnly: true,
      // sameSite: "none",
      sameSite: "lax",
    }, 
  })
);

app.use("/auth", authRouter);
app.use("/api/host", hostRouter);
app.use("/api/user", userRouter);

app.post("/api/upload", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
 
  const fileUrls = req.files.map((file) => file.path); // file.path is Cloudinary URL

  res.status(200).json({ imageUrls: fileUrls });
});

// Serve static frontend
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// React Router fallback for any other request
app.use((req, res) => { 
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
}); 

const PORT = process.env.PORT || 3002;


// app.listen(process.env.PORT, () => {
//   console.log("Server Start At Port:", process.env.PORT);
// });

app.get("/", (req, res) => {
  res.send("Backend is live!");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Start At Port:", process.env.PORT || 3002);
    });
  })
  .catch((error) => {
    console.log("Mongoose is not connected", error);
  });
