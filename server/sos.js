// sos.js
const mongoose = require('mongoose');

const sosSchema = new mongoose.Schema({
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },

});

const SOS = mongoose.model('SOS', sosSchema);

module.exports = SOS;
