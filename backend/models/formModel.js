const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true,
  },
  days: {
    type: Number,
    required: true,
    min: 1,
  },
  budget: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
  },
  companion: {
    type: String,
    enum: ['solo', 'couple', 'family', 'friends'],
    required: true,
  },
  tripPlan: String,
}, { timestamps: true });

module.exports = mongoose.model('FormData', formDataSchema);
