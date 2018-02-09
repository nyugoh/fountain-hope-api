import mongoose from 'mongoose';


const kidSchema = new mongoose.Schema({
	fullName: String,
	firstName: String,
	gender: String,
	dob: String,
	placeOfBirth: String,
	religion: String,
	phoneNumber: String,
	address: String,
	email: String,
	story: String
}, { timeStamps: true });

export default mongoose.model('Kid', kidSchema);