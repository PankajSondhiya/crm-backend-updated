const mongoose = require("mongoose");
const { USERTYPES, USER_STATUS } = require("./../constant");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minLength: 10,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  userType: {
    type: String,
    required: true,
    default: USERTYPES.CUSTOMER,
  },
  userStatus: {
    type: String,
    required: true,
    default: USER_STATUS.PENDING,
  },
  firebaseUid: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
