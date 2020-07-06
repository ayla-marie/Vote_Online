const mongoose = require("mongoose");

const voterSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("user", UserSchema);
