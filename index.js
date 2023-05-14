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

app.get("/character/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    const characterId = response.data;
    res.status(200).json(characterId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || "";
    const limit = req.query.limit || "100";
    const skip = req.query.skip || "0";

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&skip=${skip}&limit=${limit}`
    );
    const comics = response.data;
    res.status(200).json(comics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "cette Route n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started!!!!");
});
