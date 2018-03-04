import {Router} from 'express';
import Message from '../models/Messages';

const router = Router();

router.post('/api/messages', (req, res) =>{
  const message = new Message(req.body.message);
  message.save().then((message) => {
    if (message) {
      res.json({status: "ok"});
    } else {
      res.status(404).json({errors: {global: 'Invalid credentials.'}})
    }
  });
});

router.get('/api/messages', (req, res) => {
	Message.find().then( messages => {
		setTimeout( function() {
			res.json({messages:messages});
		}, 1000)
	}).catch( error => {
		res.status(404).json({errors:{ global: 'Error getting records'}});
	});
});

router.get('/api/messages/:kidId', (req, res) => {
	Message.findById({to:req.params.kidId}).then( message => {
		setTimeout( function() {
			res.json({message:message});
		}, 1000)
	}).catch( error => {
		res.status(404).json({errors:{ global: error.message}});
	});
});

export default router;
