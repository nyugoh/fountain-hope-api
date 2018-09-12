import {Router} from 'express';
import User from '../models/Users';

const router = Router();

router.post('/api/auth', (req, res) =>{
  const { credentials } = req.body;
  User.findOne({email:credentials.email}).then((user) => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({user: user.authJWT()});
    } else {
      res.status(404).json({errors: {global: 'Invalid credentials.'}})
    }
  });
});

router.post('/api/register', (req, res) =>{
  const { credentials } = req.body;
  let user = new User(credentials);
  user.password = user.generateHash(user.password);
  user.save().then((user) => {
    if (user) {
      res.json({user: user.authJWT()});
    } else {
      res.status(404).json({errors: {global: 'Invalid credentials.'}})
    }
  });
});

export default router;
