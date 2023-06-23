const express = require("express");
const router = express.Router();
const House = require("../models/House");
const User = require("../models/User");

/**
 * @openapi
 * /api/house:
 *   get:
 *     summary: To get all houses from DB
 *     tags:
 *       - HouseRoutes
 *     responses:
 *       '200':
 *         description: Successfully fetched all houses
 *       '400':
 *         description: Something went wrong
 */
router.get("/:houseOwner", async (req, res, next) => {
  const { houseOwner } = req.params;
  try {
    const houseList = await User.find(
      { userName: houseOwner },
      { houseList: true }
    );
    res.status(200).json({ houseList });
  } catch (err) {
    next(err);
  }
});

router.post("/:houseOwner", async (req, res, next) => {
  try {
    const { houseName, size, rooms, address } = req.body;
    const { houseOwner } = req.params;
    if (!address || !houseName)
      res.status(400).json("Necessary parameter missing");
    else {
      const userExists = await User.findOne({ userName: houseOwner });
      if (userExists) {
        var houseCreation = await House.create({
          houseName,
          address,
          size,
          rooms,
        });
        await User.findOneAndUpdate(
          { userName: houseOwner },
          { $push: { houseList: houseCreation._id } }
        );

        res
          .status(200)
          .json({ status: "success", message: "Created house successfully" });
      } else {
        res.status(400).json({ status: "failure", message: "User is invalid" });
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
