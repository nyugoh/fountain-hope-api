import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
   fromName: {
     type: String,
     required: true
   },
   fromEmail: {
     type: String,
     required: true
   },
   to: {
     type: String,
     default: 'admin'
   },
   body: {
     type: String,
     required: true
   },
   isRead: {
     type: Boolean,
     default: false
   }
}, {timestamps: true});

export default mongoose.model('Message', messageSchema);
