const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bedroom = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  totalArea: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  houseAddress: {
    type: String,
    required: true,
  }, // associate username or house address as primary key
});
module.exports = mongoose.model("Bedroom", Bedroom);
