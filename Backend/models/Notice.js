const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    description: 'Notice text content'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notice', noticeSchema);
