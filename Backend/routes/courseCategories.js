const express = require('express');
const CourseCategory = require('../models/CourseCategory');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public: Get all course categories
router.get('/', async (req, res) => {
  try {
    const categories = await CourseCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course categories' });
  }
});

// Admin: Create course category
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const category = new CourseCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Update course category
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const category = await CourseCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Admin: Delete course category
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (!req.admin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const category = await CourseCategory.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
