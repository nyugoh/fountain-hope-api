import {Router} from 'express';
import Kid from '../models/Kids';

const route = Router();

route.get('/api/kids', (req, res) => {
	Kid.find().then( kids => {
		res.send(kids);
	}).catch( error => {
		res.status(404).json({errors:{ global: 'Error getting records'}});
	});
});

route.post('/api/kids', (req, res) =>{
	const kid = new Kid(req.body.kid);
	kid.save().then( responce => {
		res.json({status:{ok: 'ok'}, data:{kid:kid}});
	}).catch( err =>{
		res.status(404).json({errors: { global: err }});
	});
});

export default route;