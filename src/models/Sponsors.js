import mongoose from 'mongoose';

const Sponsor = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  kidsSponsored: {
    type: Array
  },
  profileImages: {
    type: Array
  }
}, { timestamps: true });

export default mongoose.model('Sponsor', Sponsor);