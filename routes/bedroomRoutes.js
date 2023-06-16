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
        houseId,
      });
      await House.findByIdAndUpdate(
        { _id: houseId },
        { $push: { rooms: roomCreation } }
      );
      res
        .status(200)
        .json({ status: "success", message: "added room successfully !!" });
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:houseId/:bedroomId", async (req, res, next) => {
  try {
    const { houseId, bedroomId } = req.params;
    const { roomName, totalArea, type } = req.body;
    if (!bedroomId || !houseId)
      res.status(400).json("Necessary parameter missing");
    else {
      await Bedroom.findOneAndUpdate(
        { _id: bedroomId },
        {
          roomName,
          totalArea,
          type,
          houseId,
        }
      );
      await House.updateOne(
        { _id: houseId, "rooms._id": bedroomId },
        {
          $set: {
            "rooms.$.roomName": roomName,
            "rooms.$.totalArea": totalArea,
            "rooms.$.type": type,
            "rooms.$.houseId": houseId,
          },
        }
      );
      res.status(200).json({
        status: "success",
        message: "updated bedroom details successfully",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
