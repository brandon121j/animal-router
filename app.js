const express = require("express");
const logger = require("morgan");
const path = require("path");

animalRouter = require("./routes/animalRouter");

const app = express();

const PORT = process.env.PORT || 3000; 

app.use(logger("combined")); // Logs http requests
app.use(express.json()); // Logs incoming data in json format
app.use(express.urlencoded({ extended: false })); // Allows application to read form data

app.use("/api/animal", animalRouter); // http request path

// Function that console logs that the server is running
app.listen(PORT, function() {
    console.log(`Server is noow running @ port ${port}`);
});