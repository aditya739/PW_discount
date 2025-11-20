const express = require('express');
const Analytics = require('../models/Analytics');
const Coupon = require('../models/Coupon');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Admin: Track coupon redemption
router.post('/track', async (req, res) => {
  try {
    const { couponCode, courseId, userId, discountAmount } = req.body;
    
    const coupon = await Coupon.findById(couponCode);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    if (coupon.totalUsageLimit && coupon.currentUsage >= coupon.totalUsageLimit) {
      return res.status(400).json({ error: 'Usage limit reached' });
    }

    const analytics = new Analytics({
      couponCode,
      courseId,
      userId,
      discountAmount,
      status: 'redeemed'
    });

    await analytics.save();
    coupon.currentUsage += 1;
    await coupon.save();

    res.status(201).json(analytics);
  } catch (err) {
    res.status(500).json({ error: 'Tracking failed' });
  }
});

// Admin: Get coupon performance
router.get('/performance/:couponId', authMiddleware, async (req, res) => {
  try {
    const analytics = await Analytics.find({ couponCode: req.params.couponId });
    const coupon = await Coupon.findById(req.params.couponId);

    const redemptionRate = coupon.totalUsageLimit 
      ? ((coupon.currentUsage / coupon.totalUsageLimit) * 100).toFixed(2)
      : 'N/A';

    res.json({
      coupon: coupon.code,
      totalRedemptions: coupon.currentUsage,
      redemptionRate,
      usageLimit: coupon.totalUsageLimit,
      analytics
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch performance' });
  }
});



// Admin: Get all analytics
router.get('/', authMiddleware, async (req, res) => {
  try {
    const analytics = await Analytics.find().populate('couponCode').sort({ redemptionDate: -1 });
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

module.exports = router;
