import mongoose from 'mongoose';

exports default mongoose.model('Message', new mongoose.Schema({
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
     required: true
   },
   body: {
     type: String,
     required: true
   },
   isRead: {
     type: Boolean,
     defaultValue: false
   }
}, {timeStamps: true}));
