const express = require("express");
const cors = require("cors");

const app = express();
const stripe = require("stripe")(
  "stripeKey"
);

app.use(express.json());
app.use(cors());

app.post("/refund-payment", async (req, res) => {
  if (!req.body || !req.body.charge) {
    res.status(400).json({ message: 'Missing "paymentId"' });
  } else {
    try {
      const refund = await stripe.refunds.create({
        charge: req.body.charge,
      });
      // Handle the successful refund here
      res.status(200).json({ refund });
    } catch (error) {
      // Handle any errors that occur during the refund process
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(1234);
console.log("--- working on port ", 1234);
