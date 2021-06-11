
const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  value: {
    type: String,
    unique: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Types.ObjectId,
    ref: "User"
  }
}); 

const Promocode = model("Promocode", schema);

module.exports = Promocode;
