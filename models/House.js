const mongoose = require("mongoose");
const Bedroom = require("./Bedroom");
const User = require("./User");
const Schema = mongoose.Schema;
const House = new Schema({
  houseName: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  rooms: {
    type: [Bedroom.schema],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("House", House);
