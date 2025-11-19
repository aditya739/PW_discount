const express = require('express');
const Banner = require('../models/Banner');
const authMiddleware = require('../middleware/auth');
const { validateBanner } = require('../middleware/validation');

const router = express.Router();

// Public: Get active banners
router.get('/', async (req, res) => {
  try {
    const now = new Date();
    const banners = await Banner.find({
      isActive: true,
      startDate: { $lte: now },
      endDate: { $gte: now }
    }).populate('couponCode');

    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

// Admin: Create banner
router.post('/', authMiddleware, validateBanner, async (req, res) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Update banner
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(banner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete banner
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
