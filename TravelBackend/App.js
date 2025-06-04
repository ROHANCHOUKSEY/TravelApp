const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const path = require("path");
const multer = require("multer");

const cors = require("cors");
const hostRouter = require("./Router/HostRouter");
const userRouter = require("./Router/UserRouter");
const authRouter = require("./Router/AuthRouter");
const { error } = require("console");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).array("images");

const DB_PATH =
  "mongodb+srv://rohanchouksey02:Rohan2002@airbnb.thjlczk.mongodb.net/TravelApp?retryWrites=true&w=majority&appName=Airbnb";

const store = new mongodbStore({
  uri: DB_PATH,
  collection: "session",
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use(
  session({
    secret: "rohanchouksey",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use("/auth", authRouter);
app.use("/api/host", hostRouter);
app.use("/api/user", userRouter);

const PORT = 3002;

app.post("/api/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const fileUrls = req.files.map(
      (file) => `http://localhost:${PORT}/uploads/${file.filename}`
    ); 

    res.status(200).json({ imageUrls: fileUrls });
  });
});

mongoose
  .connect(DB_PATH)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Start At Port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongoose is not connected", error);
  });
