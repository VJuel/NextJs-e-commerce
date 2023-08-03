import mongooseConnect from "@/src/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK)
import {buffer} from 'micro'

const endpointSecret = "whsec_ac119e4862af7eb8c5f9d978784ae3a5dff519f5431338dcc48f64a927b9ebd0";

export async function POST(req, res) {
    await mongooseConnect()

    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log(paymentIntentSucceeded)
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
}

export const config = {
    api: {bodyParser: false}
}