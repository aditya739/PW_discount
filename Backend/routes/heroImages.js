const express = require('express');
const HeroImage = require('../models/HeroImage');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public: Get all hero images
router.get('/', async (req, res) => {
  try {
    const images = await HeroImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hero images' });
  }
});

// Admin: Create hero image
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { imageUrl, title, position } = req.body;

    if (!imageUrl || !title) {
      return res.status(400).json({ error: 'Image URL and title are required' });
    }

    const image = new HeroImage({
      imageUrl,
      title,
      position: position || 'left'
    });

    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Update hero image
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const image = await HeroImage.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete hero image
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const image = await HeroImage.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json({ message: 'Hero image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
