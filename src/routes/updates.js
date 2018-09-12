import {Router} from 'express';
import Updates from '../models/Updates';

const router = Router();

router.post('/api/updates', (req, res) =>{
  const update = new Updates(req.body.update);
  update.save().then(update => {
    if (update)
      res.json({ update });
    else
      res.status(500).json({errors: {global: 'Invalid credentials.'}})
  });
});

router.get('/api/updates', (req, res) => {
	Updates.find().sort({ 'updatedAt': 'desc'}).then( updates => {
		res.json({updates:updates});
	}).catch( error => {
		res.status(500).json({errors:{ global: 'Error getting records'}});
	});
});

router.delete('/api/updates/:id', (req, res) => {
    Updates.findByIdAndRemove(req.params.id).then( response => {
      if (response)
        res.json({status: "Ok"});
    }).catch( error => {
        res.status(500).json({errors:{ global: 'Error deleting update'}});
    });
});

router.put('/api/updates/:id', (req, res) => {
  Updates.findByIdAndUpdate(req.params.id, req.body.update, { new: true }).then( update => {
    res.json({update});
  }).catch( error => {
    res.status(500).json({errors:{ global: 'Error deleting update'}});
  });
});

router.get('/api/updates/:kidId', (req, res) => {
	Updates.findById({to:req.params.kidId}).then( update => {
		res.json({update});
	}).catch( error => {
		res.status(500).json({errors:{ global: error.update}});
	});
});

export default router;
