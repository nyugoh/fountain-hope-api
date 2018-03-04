import mongoose from "mongoose";

const updateSchema = new model.Schema({
  body: {
    type:String,
    required: true
  },
  images: {
    type: Array
  }
}, {timestamps: true});

export default mongoose.model('Updates', updateSchema);
