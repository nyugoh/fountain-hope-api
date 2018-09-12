import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

// TODO: Make email unique and email validation
const schema = new mongoose.Schema({
  fullName: String,
  username: String,
  email: {
    type:String,
    index: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required:true
  }
}, { timestamps: true });

schema.methods.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, 10);
};

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.authJWT = function authJWT() {
  return {
    email: this.email,
    token: this.generateToken()
  }
};

schema.methods.generateToken = function generateToken(){
  return jwt.sign({
    email: this.email
  }, process.env.JWT_SECRETE);
};


export default mongoose.model('User', schema);
