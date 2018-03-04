import mongoose from 'mongoose';


const kidSchema = new mongoose.Schema({
	fullName: String,
	sirName: String,
	firstName: String,
	middleName: String,
	gender: String,
	dob: Date,
	pob: String,
	religion: String,
	phoneNumber: String,
	address: String,
	email: String,
	story: String,
	lastUpdate: {
		type: Date,
		default: Date.now
	},
	updates: [{ body: String, date: Date }],
	comments: [{ body: String, date: Date }],
}, { timestamps: true });

export default mongoose.model('Kid', kidSchema);
