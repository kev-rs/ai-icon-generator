import { env } from "@/env.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe, { type Stripe as Str } from "stripe";
import { prisma } from "@/server/db";
import { buffer } from 'micro';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

type PaymentCheck = {
  id: string; 
  amount: number;
  created: number;
  status: "succeeded"
  billing_details: {
    name: string;
    email: string;
  };
  paid: boolean;
}


const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST').status(405).send('Method not allowed');  

  const reqBuffer = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;
  let event: Str.Event;

  try {
    event = stripe.webhooks.constructEvent(reqBuffer, sig, env.STRIPE_WEBHOOK_SECRET);
  } 
  catch (err) {
    let message = "Unknown Error"
    if (err instanceof Error) message = err.message;
    return res.status(400).send(`Webhook Error: ${message}`);
  }

  // console.log({
  //   type: event.type,
  //   request: event.request,
  //   data: event.data.object
  // });

  // Handle the event
  switch (event.type) {
    // case 'payment_intent.succeeded':
    case 'charge.succeeded':
      const paymentIntent = event.data.object as PaymentCheck;
      const totalPaid = paymentIntent.amount / 100;

      const user = await prisma.user.findUnique({
        where: { email: paymentIntent.billing_details.email },
        select: { email: true, credits: true, paymentCredits: true, name: true }
      });

      if (!user) {
        res.status(404).json({ error: "Your email, and the email provided on the payment checkout don't match" });
        break;
      }

      /* eslint-disable */
      await prisma.user.update({
        where: { email: paymentIntent.billing_details.email },
        data: {
          credits: {
            increment: ((totalPaid / 5) * 100)
          },
          paymentCredits: {
            create: {
              amount: totalPaid,
              paidAt: new Date(paymentIntent.created),
              paidOut: paymentIntent.paid && paymentIntent.status === "succeeded",
              receipt_email: paymentIntent.billing_details.email,
            }
          }
        }
      });

      /* eslint-enable */
      console.log('PaymentIntent was successful!', paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!', paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).json({ received: true });
}

export default webhook;