const mongoose = require("mongoose");
const House = require("./House");
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - firstName
 *        - lastName
 *        - emailId
 *        - mobileNo
 *      properties:
 *        firstName:
 *          type: string
 *          default: Jane
 *        lastName:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        mobileNo:
 *          type: number
 *          default: 123456789
 */
const User = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  houseList: {
    type: [mongoose.Types.ObjectId],
    requied: true,
  },
});
module.exports = mongoose.model("User", User);
