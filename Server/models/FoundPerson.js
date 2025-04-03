import mongoose from 'mongoose';

const foundPersonSchema = new mongoose.Schema({
  approximateAge: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Unknown']
  },
  foundDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Resolved'],
    default: 'Active'
  }
}, {
  timestamps: true
});

const FoundPerson = mongoose.model('FoundPerson', foundPersonSchema);

export default FoundPerson;