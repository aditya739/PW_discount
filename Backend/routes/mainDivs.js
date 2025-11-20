const express = require('express');
const MainDiv = require('../models/MainDiv');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public: Get all active main divs
router.get('/', async (req, res) => {
  try {
    const mainDivs = await MainDiv.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(mainDivs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch main divs' });
  }
});

// Admin: Get all main divs (including inactive)
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const mainDivs = await MainDiv.find().sort({ createdAt: -1 });
    res.json(mainDivs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch main divs' });
  }
});

// Admin: Create main div
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const mainDiv = new MainDiv(req.body);
    await mainDiv.save();
    res.status(201).json(mainDiv);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Update main div
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const mainDiv = await MainDiv.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    if (!mainDiv) {
      return res.status(404).json({ error: 'Main div not found' });
    }

    res.json(mainDiv);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete main div
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const mainDiv = await MainDiv.findByIdAndDelete(req.params.id);

    if (!mainDiv) {
      return res.status(404).json({ error: 'Main div not found' });
    }

    res.json({ message: 'Main div deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
