
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceType: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
