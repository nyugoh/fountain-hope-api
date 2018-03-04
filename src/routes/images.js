import express from 'express';

const router = express.Router();

router.post('/upload', (req, res) => {
  if(!req.files)
    res.status(404).json({status:"error"});
  for(let f in req.files){
    console.log(`${process.cwd()}/assets/images/${req.files[f].name}`);
    req.files[f].mv(`${process.cwd()}/assets/images/${req.files[f].name}`, function(response, error){
      if (error)
        res.status(404).json({status:"error"});
    });
  }
  res.json({status: "ok"});
});

export default router;
