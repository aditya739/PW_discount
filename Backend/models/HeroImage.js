const mongoose = require('mongoose');

const heroImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
    description: 'URL of the image (Google Drive, Unsplash, etc.)'
  },
  title: {
    type: String,
    required: true,
    description: 'Title of the hero image'
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
  position: {
    type: String,
    enum: ['left', 'right', 'top', 'bottom'],
    default: 'left',
    description: 'Position of the image on the page'
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

module.exports = mongoose.model('HeroImage', heroImageSchema);
