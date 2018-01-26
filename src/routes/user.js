import {Router} from 'express';
import User from '../models/Users';

const router = Router();

router.post('/', (req, res) =>{
  const { credentials } = req.body;
  User.findOne({email:credentials.email}).then((user) => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({user: user.authJWT()});
    } else {
      res.status(404).json({errors: {global: 'Invalid credentials.'}})
    }
  });
});

export default router;