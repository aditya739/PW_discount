const mongoose = require('mongoose');

const courseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    description: 'Name of the course category (e.g., JEE, NEET)'
  },
  discountText: {
    type: String,
    required: true,
    description: 'Discount details (e.g., 10% upto 500)'
  },
  applicableCode: {
    type: String,
    required: true,
    description: 'The coupon code applicable for this category'
  },
  iconUrl: {
    type: String,
    description: 'Optional icon or image for the category'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CourseCategory', courseCategorySchema);
