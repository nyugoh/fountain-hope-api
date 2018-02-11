import {Router} from 'express';
import Kid from '../models/Kids';

const route = Router();

route.get('/api/kids', (req, res) => {
	Kid.find().then( kids => {
		setTimeout( function() {
			res.json({kids:kids});
		}, 1000)
	}).catch( error => {
		res.status(404).json({errors:{ global: 'Error getting records'}});
	});
});

route.get('/api/kid/:kidId', (req, res) => {
	Kid.findById({_id:req.params.kidId}).then( kid => {
		setTimeout( function() {
			res.json({kid:kid});
		}, 1000)
	}).catch( error => {
		res.status(404).json({errors:{ global: error.message}});
	});
});

route.put('/api/kid/:kidId', (req, res) => {
	Kid.findByIdAndUpdate(req.params.kidId, req.body.kid).then( kid => {
		res.json({kid:kid});
	}).catch( error => {
		res.status(404).json({errors:{ global: error.message}});
	});
});

route.post('/api/kids', (req, res) =>{
	const kid = new Kid(req.body.kid);
	kid.save().then( responce => {
		res.json({status:{ok: 'ok'}, data:{kid:kid}});
	}).catch( err =>{
		res.status(404).json({errors: { global: 'Api error' }});
	});
});

export default route;