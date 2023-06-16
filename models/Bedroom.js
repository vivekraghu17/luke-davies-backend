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
  houseId: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Bedroom", Bedroom);
