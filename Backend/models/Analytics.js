const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  couponCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon',
    required: true
  },
  courseId: String,
  userId: String,
  redemptionDate: {
    type: Date,
    default: Date.now
  },
  discountAmount: Number,
  status: {
    type: String,
    enum: ['redeemed', 'failed'],
    default: 'redeemed'
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
