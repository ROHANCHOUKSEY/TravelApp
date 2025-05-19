const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const hostRouter = require("./Router/HostRouter");

const DB_PATH =
  "mongodb+srv://rohanchouksey02:Rohan2002@airbnb.thjlczk.mongodb.net/TravelApp?retryWrites=true&w=majority&appName=Airbnb";

app.use(express.json());
app.use(cors());
app.use("/api/host", hostRouter);

const PORT = 3002;

mongoose.connect(DB_PATH).then(() => {
  app.listen(PORT, () => {
    console.log(`Server Start At Port: http://localhost:${PORT}`);
  });
}).catch(error => {
    console.log("Mongoose is not connected", error);
})
 