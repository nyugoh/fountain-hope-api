import { Router } from "express";
import User from "../models/Users";
const paypal = require("paypal-rest-sdk");
const router = Router();

require("dotenv").config();

// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID, // please provide your client id here
  client_secret: process.env.PAYPAL_SECRET_KEY // provide your client secret here
});

router.post("/api/auth", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.authJWT() });
    } else {
      res.status(404).json({ errors: { global: "Invalid credentials." } });
    }
  });
});

router.post("/api/register", (req, res) => {
  const { credentials } = req.body;
  let user = new User(credentials);
  user.password = user.generateHash(user.password);
  user.save().then(user => {
    if (user) {
      res.json({ user: user.authJWT() });
    } else {
      res.status(404).json({ errors: { global: "Invalid credentials." } });
    }
  });
});

// start payment process
router.post("/api/donate", (req, res) => {
  // create payment object
  let donation = req.body;
  var payment = {
    intent: "authorize",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: "http://127.0.0.1:3000/success",
      cancel_url: "http://127.0.0.1:3000/error"
    },
    transactions: [
      {
        amount: {
          total: donation.amount,
          currency: "USD"
        },
        description: "Donation to Fountain of Hope Children Home Limuru"
      }
    ]
  };

  // call the create Pay method
  createPay(payment)
    .then(transaction => {
      var id = transaction.id;
      var links = transaction.links;
      var counter = links.length;
      while (counter--) {
        if (links[counter].method == "REDIRECT") {
          // redirect to paypal where user approves the transaction
          return res.redirect(links[counter].href);
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect("/err");
    });
});

// helper functions
var createPay = payment => {
  return new Promise((resolve, reject) => {
    paypal.payment.create(payment, function(err, payment) {
      if (err) {
        reject(err);
      } else {
        resolve(payment);
      }
    });
  });
};

export default router;
