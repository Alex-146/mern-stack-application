
const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [String],
}); 

const User = model("User", schema);

module.exports = User;
