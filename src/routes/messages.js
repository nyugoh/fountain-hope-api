import { Router } from "express";
import Message from "../models/Messages";
import Sponsors from "../models/Sponsors";
import Kid from "../models/Kids";
import route from "./kids";

const router = Router();

router.post("/api/messages", (req, res) => {
  const message = new Message(req.body.message);
  message
    .save()
    .then(message => {
      if (message) {
        res.json({ status: "ok", message });
      } else {
        res.status(404).json({ errors: { global: "Invalid credentials." } });
      }
    })
    .catch(error => {
      res.status(404).json({ errors: error.message });
    });
});

router.post("/api/messages/:id/read", (req, res) => {
  Message.findById({ _id: req.params.id })
    .then(message => {
      message.isRead = true;
      message.save().then(message => {
        if (message) res.json({ message });
      });
    })
    .catch(error => {
      res.status(404).json({ errors: error.message });
    });
});

router.delete("/api/messages/:id", (req, res) => {
  Message.findByIdAndRemove(req.params.id)
    .then(message => {
      if (message) res.json(message);
    })
    .catch(error => {
      res.status(404).json({ errors: error.message });
    });
});

router.get("/api/messages", (req, res) => {
  var count;
  var limit = 50;
  var page;
  var skip;
  if (req.query) page = parseInt(req.query.page);
  else page = 1;
  skip = page === 1 ? 0 : (page - 1) * limit;
  Message.count({})
    .then(total => {
      count = total;
    })
    .catch(error => {
      console.log(error.message);
    });
  Message.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .then(messages => {
      setTimeout(function() {
        res.json({ body: messages, total: count });
      }, 1000);
    })
    .catch(error => {
      res.status(404).json({ errors: { global: "Error getting records" } });
    });
});

router.get("/api/messages/:kidId", (req, res) => {
  Message.findById({ to: req.params.kidId })
    .then(message => {
      setTimeout(function() {
        res.json({ message: message });
      }, 1000);
    })
    .catch(error => {
      res.status(404).json({ errors: { global: error.message } });
    });
});

router.get("/api/sponsors", (req, res) => {
  var count;
  var limit = 20;
  var page;
  var skip;
  if (req.query) page = parseInt(req.query.page);
  else page = 1;
  skip = page === 1 ? 0 : (page - 1) * limit;
  Sponsors.count({})
    .then(total => {
      count = total;
    })
    .catch(error => {
      console.log(error.message);
    });
  Sponsors.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .then(sponsors => {
      res.json({ sponsors: sponsors, total: count });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: "Error getting records" } });
    });
});

router.post("/api/sponsors", (req, res) => {
  const sponsor = new Sponsors(req.body.sponsor);
  sponsor
    .save()
    .then(sponsor => {
      res.json({ sponsor });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: "Error getting records" } });
    });
});

router.post("/api/sponsors/:id/archive", (req, res) => {
  Sponsors.findById({ _id: req.params.id })
    .then(sponsor => {
      sponsor.isShowing = !sponsor.isShowing;
      sponsor.save();
      res.json({ sponsor });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: error.message } });
    });
});

route.delete("/api/sponsors/:id", (req, res) => {
  Sponsors.findByIdAndRemove(req.params.id)
    .then(sponsor => {
      if (sponsor) res.json({ sponsor });
    })
    .catch(err => {
      res.status(404).json({ errors: { global: err.message } });
    });
});

route.put("/api/sponsors/:sponsorId", (req, res) => {
  Sponsors.findByIdAndUpdate(req.params.sponsorId, req.body.sponsor, {
    new: true
  })
    .then(sponsor => {
      res.json({ sponsor });
    })
    .catch(error => {
      res.status(404).json({ errors: { global: error.message } });
    });
});

export default router;
