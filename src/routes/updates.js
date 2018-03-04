import {Router} from 'express';
import Updates from '../models/Updates';

const router = Router();

router.post('/api/updates', (req, res) =>{
  const update = new Updates(req.body.update);
  update.save().then((update) => {
    if (update) {
      res.json({status: "ok"});
    } else {
      res.status(404).json({errors: {global: 'Invalid credentials.'}})
    }
  });
});

router.get('/api/updates', (req, res) => {
	Updates.find().then( updates => {
		setTimeout( function() {
			res.json({updates:updates});
		}, 1000)
	}).catch( error => {
		res.status(404).json({errors:{ global: 'Error getting records'}});
	});
});

router.get('/api/updates/:kidId', (req, res) => {
	Updates.findById({to:req.params.kidId}).then( update => {
		setTimeout( function() {
			res.json({update:update});
		}, 1000)
	}).catch( error => {
		res.status(404).json({errors:{ global: error.update}});
	});
});

export default router;
