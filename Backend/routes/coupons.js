const express = require('express');
const Coupon = require('../models/Coupon');
const Analytics = require('../models/Analytics');
const authMiddleware = require('../middleware/auth');
const { validateCoupon } = require('../middleware/validation');

const router = express.Router();

// Public: Get all active coupons
router.get('/', async (req, res) => {
  try {
    const { sort, filter } = req.query;
    let query = { isActive: true, startDate: { $lte: new Date() }, endDate: { $gte: new Date() } };

    let coupons = await Coupon.find(query);

    if (filter === 'expiring-soon') {
      coupons = coupons.sort((a, b) => a.endDate - b.endDate).slice(0, 5);
    } else if (filter === 'new') {
      coupons = coupons.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
    }

    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});

// Public: Validate coupon
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    const now = new Date();
    if (coupon.startDate > now || coupon.endDate < now) {
      return res.status(400).json({ error: 'Coupon expired or not active' });
    }

    if (coupon.totalUsageLimit && coupon.currentUsage >= coupon.totalUsageLimit) {
      return res.status(400).json({ error: 'Coupon usage limit reached' });
    }

    res.json({ valid: true, coupon });
  } catch (err) {
    res.status(500).json({ error: 'Validation failed' });
  }
});

// Admin: Create coupon
router.post('/', authMiddleware, validateCoupon, async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json(coupon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Update coupon
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(coupon);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete coupon
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
