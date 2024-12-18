const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/contactDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Définir la route principal d'une API
app.use("/api/contacts", contactRoutes); // http://localhost:3000/api/contacts

// Lancement du Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});