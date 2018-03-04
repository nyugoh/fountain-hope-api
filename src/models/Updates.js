import mongoose from "mongoose";

const updateSchema = new mongoose.Schema({
  body: {
    type:String,
    required: true
  },
  images: {
    type: Array
  },
  kidId: {
    type: String
  }
}, {timestamps: true});

export default mongoose.model('Updates', updateSchema);
