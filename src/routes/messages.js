import {Router} from 'express';
import Message from '../models/Messages';
import Sponsors from '../models/Sponsors';

const router = Router();

router.post('/api/messages', (req, res) =>{
	const message = new Message(req.body.message);
  message.save().then((message) => {
    if (message) {
      res.json({status: "ok"});
    } else {
      res.status(404).json({errors: {global: 'Invalid credentials.'}})
    }
  }).catch(error =>{
		console.log(error);
		res.status(404).json({errors: error.message})
	});
});

router.get('/api/messages', (req, res) => {
	var count;
  var limit = 2;
  var page;
  var skip;
  if(req.query)
    page = parseInt(req.query.page);
	else
		page = 1;
  skip = page===1? 0: (page-1)*limit;
	Message.count({}).then((total)=>{
		count = total;
	}).catch(error =>{
		console.log(error.message)
	});
	Message.find().sort({'createdAt': -1}).skip(skip).limit(limit).then( messages => {
		setTimeout( function() {
			res.json({body:messages, total:count});
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

router.get('/api/sponsors', (req, res) => {
  Sponsors.find().then( sponsors => {
    res.json({sponsors:sponsors});
  }).catch( error => {
    res.status(404).json({errors:{ global: 'Error getting records'}});
  });
});

router.post('/api/sponsors', (req, res) => {
	const sponsor = new Sponsors(req.body.sponsor);
  sponsor.save().then( sponsor => {
    res.json({status:'ok'});
  }).catch( error => {
    res.status(404).json({errors:{ global: 'Error getting records'}});
  });
});

export default router;
