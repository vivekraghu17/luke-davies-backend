const express = require("express");
const router = express.Router();
const House = require("../models/House");

router.get("/", async (req, res, next) => {
  try {
    allHouse = await House.find();
    res.status(200).json({ allHouse });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { houseName, userName, size, rooms } = req.body;
    if (!userName || !houseName)
      res.status(400).json("Necessary parameter missing");
    else {
      var houseCreation = await House.create({
        houseName,
        userName,
        size,
        rooms,
      });

      res
        .status(200)
        .json({ status: "success", message: "Created house successfully" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
