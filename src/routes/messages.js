import {Router} from 'express';
import Message from '../models/Messages';
import Sponsors from '../models/Sponsors';

const router = Router();

router.post('/api/messages', (req, res) =>{
	const message = new Message(req.body.message);
  message.save().then((message) => {
    if (message) {
      res.json({status: "ok", message});
    } else {
      res.status(404).json({errors: {global: 'Invalid credentials.'}})
    }
  }).catch(error =>{
		res.status(404).json({errors: error.message})
	});
});

router.post('/api/messages/:id/read', (req, res) =>{
  Message.findById({_id: req.params.id}).then(message => {
    message.isRead = true;
    message.save().then( message=>{
      if (message)
        res.json({message});
    });
  }).catch(error =>{
    res.status(404).json({errors: error.message})
  });
});

router.delete('/api/messages/:id', (req, res) =>{
  Message.findByIdAndRemove(req.params.id).then(message => {
    if(message)
      res.json(message);
  }).catch(error =>{
    res.status(404).json({errors: error.message})
  });
});

router.get('/api/messages', (req, res) => {
	var count;
  var limit = 50;
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
  var count;
  var limit = 5;
  var page;
  var skip;
  if(req.query)
    page = parseInt(req.query.page);
  else
    page = 1;
  skip = page===1? 0: (page-1)*limit;
  Sponsors.count({}).then((total)=>{
    count = total;
  }).catch(error =>{
    console.log(error.message)
  });
  Sponsors.find().sort({'createdAt': -1}).skip(skip).limit(limit).then( sponsors => {
    res.json({sponsors:sponsors, total:count});
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
