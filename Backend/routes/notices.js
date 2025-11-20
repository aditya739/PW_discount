const express = require('express');
const Notice = require('../models/Notice');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public: Get all notices
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

// Admin: Create notice
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Notice text is required' });
    }

    const notice = new Notice({ text });
    await notice.save();
    res.status(201).json(notice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete notice
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const notice = await Notice.findByIdAndDelete(req.params.id);

    if (!notice) {
      return res.status(404).json({ error: 'Notice not found' });
    }

    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
