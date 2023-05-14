//Import packages
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/characters", async (req, res) => {
  try {
    let name = "";
    if (req.query.name) {
      name = req.query.name;
    }
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.messsage });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "cette Route n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started!!!!");
});
