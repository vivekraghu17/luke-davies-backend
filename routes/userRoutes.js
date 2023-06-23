const express = require("express");
const router = express.Router();
const User = require("../models/User");

/**
 * @openapi
 * '/api/user/all':
 *    get:
 *      summary: To get all users list
 *      tags:
 *        - UserRoutes
 *      responses:
 *        '200':
 *          description: Succesfully fetched all users
 *        '400':
 *          description: Something went wrong
 */
router.get("/all", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ allUsers });
  } catch (err) {
    next(err);
  }
});

/**
 * @openapi
 * '/api/user/':
 *    post:
 *       summary: To create a user
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/CreateUserInput'
 *       tags:
 *         - UserRoutes
 *       responses:
 *         '200':
 *           description: Successfully created a user
 *         '400':
 *           description: Necessary parameter missing
 *         '409':
 *           description: User already exists
 *
 */
router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, emailId, mobileNo } = req.body;
    if (!firstName || !lastName || !emailId || !mobileNo)
      res.status(400).json("Necessary parameter missing");
    else {
      const userExists = await User.findOne({
        $or: [{ emailId: emailId }, { mobileNo: mobileNo }],
      });

      if (userExists) {
        res
          .status(409)
          .json({ status: "failure", message: "User already exists" });
      } else {
        var userCreation = await User.create({
          firstName,
          lastName,
          emailId,
          userName: emailId.split("@")[0],
          mobileNo,
        });
        res
          .status(200)
          .json({ status: "success", message: "Created user successfully" });
      }
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
