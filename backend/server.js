const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
dotenv.config();

//Create the application
const app = express();

//Add cors to application
const options = {
  origin: "http://localhost:3000",
  useSuccessStatus: 200,
};
app.use(cors(options));

//Use json
app.use(express.json);

//Dynamically get all the routes. No need to update this when new route is added
readdirSync("./routes").map((r) => {
  app.use("/", require("./routes/" + r));
});

//Connect to database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo db", err);
  });

//Get port
const PORT = process.env.PORT || 8000;

//Listen for connections
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
