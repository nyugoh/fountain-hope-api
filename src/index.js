import express from 'express';
import mongoose from 'mongoose';
import Promise from 'bluebird';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import path from 'path';
import dotenv from 'dotenv';
import user from './routes/user';
import kids from './routes/kids';
import messages from './routes/messages';
import updates from './routes/updates';
import images from './routes/images';

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(fileUpload());
mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = Promise;

app.use('/*', (req, res, next) =>{
  console.log(req.baseUrl);
  next();
});
app.use('/api/auth', user);
app.use(kids);
app.use(messages);
app.use(updates);
app.use('/api/v1/images', images);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, ()=> console.log('Server is running on ::8080'));
