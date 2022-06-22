const express = require("express");
const cors = require("cors");

//Create the application
const app = express();

//Add cors to application
const options = {
    origin: "http://localhost:3000",
    useSuccessStatus: 200,
}
app.use(cors(options)); 

//Endpoints
app.get("/", (req, res) => {
    res.send("Welcome to home page")
});
app.get("/books", (req, res) => {
    res.send("Welcome to book pagess")
});

//Listen for connections
app.listen(8000, ()=>{
    console.log("server listening")
})
