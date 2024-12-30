require("dotenv").config();
const express = require("express");
const cors = require("cors");

const PORT = process.env.SERVER_PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/posts", require("./routes/postsRoute"));

app.listen(PORT);
