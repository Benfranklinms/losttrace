import express from 'express';
import FoundPerson from '../models/FoundPerson.js';
import Notification from '../models/Notification.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/found
// @desc    Get all found persons
// @access  Public
router.get('/', async (req, res) => {
  try {
    const foundPersons = await FoundPerson.find()
      .sort({ createdAt: -1 });
    
    res.json(foundPersons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/found/:id
// @desc    Get found person by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findById(req.params.id);
    
    if (!foundPerson) {
      return res.status(404).json({ message: 'Found person not found' });
    }
    
    res.json(foundPerson);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Found person not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/found
// @desc    Create a found person report
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { approximateAge, gender, foundDate, location, description, contactInfo } = req.body;

    const foundPerson = new FoundPerson({
      approximateAge,
      gender,
      foundDate,
      location,
      description,
      contactInfo,
      reportedBy: req.user._id
    });

    const savedFoundPerson = await foundPerson.save();

    // Create notification for the user
    await Notification.create({
      userId: req.user._id,
      message: `Your found person report has been submitted successfully.`,
      type: 'Found Person',
      relatedId: savedFoundPerson._id,
      onModel: 'FoundPerson'
    });

    res.status(201).json(savedFoundPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/found/:id
// @desc    Update a found person report
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findById(req.params.id);
    
    if (!foundPerson) {
      return res.status(404).json({ message: 'Found person not found' });
    }
    
    // Check if user is the one who reported
    if (foundPerson.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to update this report' });
    }
    
    const updatedFoundPerson = await FoundPerson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    res.json(updatedFoundPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/found/:id
// @desc    Delete a found person report
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findById(req.params.id);
    
    if (!foundPerson) {
      return res.status(404).json({ message: 'Found person not found' });
    }
    
    // Check if user is the one who reported
    if (foundPerson.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this report' });
    }
    
    await foundPerson.deleteOne();
    
    res.json({ message: 'Found person report removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;