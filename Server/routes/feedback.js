import express from 'express';
import Feedback from '../models/Feedback.js';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { subject, category, message } = req.body;

    const feedback = new Feedback({
      subject,
      category,
      message,
      userId: req.user._id
    });

    const savedFeedback = await feedback.save();

    // Create notification for the user
    await Notification.create({
      userId: req.user._id,
      message: `Thank you for your feedback. We'll review it shortly.`,
      type: 'Feedback',
      relatedId: savedFeedback._id,
      onModel: 'Feedback'
    });

    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/feedback
// @desc    Get all feedback for a user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;