const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the applicatiom. " });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
