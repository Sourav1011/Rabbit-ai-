const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});