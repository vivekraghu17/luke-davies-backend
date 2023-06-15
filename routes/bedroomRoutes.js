const express = require("express");
const router = express.Router();
const Bedroom = require("../models/Bedroom");
const House = require("../models/House");

router.post("/:houseId", async (req, res, next) => {
  try {
    const { roomName, totalArea, type } = req.body;
    const { houseId } = req.params;
    if (!roomName || !houseId)
      res.status(400).json("Necessary parameter missing");
    else {
      var roomCreation = await Bedroom.create({
        roomName,
        totalArea,
        type,
      });
      await House.findByIdAndUpdate(
        { _id: houseId },
        { $push: { rooms: roomCreation } }
      );
      res.status(200).json("added room successfully !!");
    }
  } catch (err) {
    next(err);
  }
});
module.exports = router;
