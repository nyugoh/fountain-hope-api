import { Router } from "express";
import Kid from "../models/Kids";

const route = Router();

route.get("/api/kids", (req, res) => {
  var count;
  var limit = 5;
  var page;
  var skip;
  if (req.query) page = parseInt(req.query.page);
  else page = 1;
  skip = page === 1 ? 0 : (page - 1) * limit;
  Kid.count({})
    .then(total => {
      count = total;
    })
    .catch(error => {
      console.log(error.message);
    });
  Kid.find()
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .then(kids => {
      res.json({ kids: kids, page: page });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: "Error getting records" } });
    });
});

route.get("/api/kid/:kidId", (req, res) => {
  Kid.findById({ _id: req.params.kidId })
    .then(kid => {
      res.json({ kid: kid });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: error.message } });
    });
});

route.put("/api/kid/:kidId", (req, res) => {
  Kid.findByIdAndUpdate(req.params.kidId, req.body.kid, { new: true })
    .then(kid => {
      res.json({ kid: kid });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: error.message } });
    });
});

route.put("/api/kid/:kidId/update", (req, res) => {
  let update = {
    date: new Date(),
    body: req.body.update.update
  };
  Kid.findById({ _id: req.params.kidId })
    .then(kid => {
      kid.updates.push(update);
      kid.save().then(kid => {
        res.json({ kid: kid });
      });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: error.message } });
    });
});

route.post("/api/kids/:kidId/archive", (req, res) => {
  Kid.findById({ _id: req.params.kidId })
    .then(kid => {
      kid.isShowing = !kid.isShowing;
      kid.save();
      res.json({ kid: kid });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: error.message } });
    });
});

route.post("/api/kids", (req, res) => {
  const kid = new Kid(req.body.kid);
  kid
    .save()
    .then(response => {
      res.json({ status: { ok: "ok" }, data: { kid: kid } });
    })
    .catch(err => {
      res.status(404).json({ errors: { global: "Api error" } });
    });
});

route.delete("/api/kids/:kidId", (req, res) => {
  Kid.findByIdAndRemove(req.params.kidId)
    .then(response => {
      res.json({ status: "ok" });
    })
    .catch(err => {
      res.status(404).json({ errors: { global: "Api error" } });
    });
});

export default route;
