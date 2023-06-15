const mongoose = require("mongoose");
const Bedroom = require("./Bedroom");
const Schema = mongoose.Schema;
const House = new Schema({
  houseName: {
    type: String,
    required: true,
  },
  userName:{
    type:String,
    required:true,
  },
  size: {
    type: String,
    required: true,
  },
  rooms: {
    type: [Bedroom.schema],
    required:true
  },
});
module.exports = mongoose.model("House", House);
