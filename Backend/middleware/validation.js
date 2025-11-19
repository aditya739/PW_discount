const { body, validationResult } = require('express-validator');

const validateCoupon = [
  body('code').trim().notEmpty().withMessage('Code is required'),
  body('discount').isNumeric().withMessage('Discount must be numeric'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').isISO8601().withMessage('Invalid end date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateBanner = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('couponCode').notEmpty().withMessage('Coupon code is required'),
  body('startDate').isISO8601().withMessage('Invalid start date'),
  body('endDate').isISO8601().withMessage('Invalid end date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateCoupon, validateBanner };
