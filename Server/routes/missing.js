import express from 'express';
import MissingPerson from '../models/MissingPerson.js';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/missing
// @desc    Get all missing persons
// @access  Public
router.get('/', async (req, res) => {
  try {
    const missingPersons = await MissingPerson.find()
      .sort({ createdAt: -1 });
    
    res.json(missingPersons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/missing/:id
// @desc    Get missing person by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const missingPerson = await MissingPerson.findById(req.params.id);
    
    if (!missingPerson) {
      return res.status(404).json({ message: 'Missing person not found' });
    }
    
    res.json(missingPerson);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Missing person not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/missing
// @desc    Create a missing person report
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, age, gender, lastSeen, location, description, contactInfo } = req.body;

    const missingPerson = new MissingPerson({
      name,
      age,
      gender,
      lastSeen,
      location,
      description,
      contactInfo,
      reportedBy: req.user._id
    });

    const savedMissingPerson = await missingPerson.save();

    // Create notification for the user
    await Notification.create({
      userId: req.user._id,
      message: `Your missing person report for ${name} has been submitted successfully.`,
      type: 'Missing Person',
      relatedId: savedMissingPerson._id,
      onModel: 'MissingPerson'
    });

    res.status(201).json(savedMissingPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/missing/:id
// @desc    Update a missing person report
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const missingPerson = await MissingPerson.findById(req.params.id);
    
    if (!missingPerson) {
      return res.status(404).json({ message: 'Missing person not found' });
    }
    
    // Check if user is the one who reported
    if (missingPerson.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this report' });
    }
    
    const updatedMissingPerson = await MissingPerson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedMissingPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/missing/:id
// @desc    Delete a missing person report
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const missingPerson = await MissingPerson.findById(req.params.id);
    
    if (!missingPerson) {
      return res.status(404).json({ message: 'Missing person not found' });
    }
    
    // Check if user is the one who reported
    if (missingPerson.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this report' });
    }
    
    await missingPerson.deleteOne();
    
    res.json({ message: 'Missing person report removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;