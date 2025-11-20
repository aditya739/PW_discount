const mongoose = require('mongoose');

const mainDivSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    description: 'Internal title for reference'
  },
  headline: {
    type: String,
    description: 'Main headline text'
  },
  subHeadline: {
    type: String,
    description: 'Subtitle or description text'
  },
  offerCode: {
    type: String,
    description: 'Coupon code to display'
  },
  discountText: {
    type: String,
    description: 'Discount details (e.g., 30% OFF)'
  },
  buttonText: {
    type: String,
    default: 'Explore All Courses',
    description: 'Text for the call-to-action button'
  },
  buttonLink: {
    type: String,
    default: '/offers',
    description: 'Link for the call-to-action button'
  },
  backgroundImageUrl: {
    type: String,
    description: 'URL of the background image'
  },
  isActive: {
    type: Boolean,
    default: true
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

module.exports = mongoose.model('MainDiv', mainDivSchema);
