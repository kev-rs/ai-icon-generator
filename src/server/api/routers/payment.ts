import { env } from '@/env.mjs';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import Stripe from "stripe";
import { z } from 'zod';

export const config = {
  api: {
    bodyParser: false,
  },
};

/* eslint-disable */
const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});
/* eslint-enable */

export const paymentRouter = createTRPCRouter({
  createCheckout: protectedProcedure.mutation(async ({ ctx }) => {
    const user_email = ctx.session.user.email as string;
    /*eslint-disable */
    const ch = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card', 'us_bank_account'],
      line_items: [
        {
          price: env.PRICE_ID,
          quantity: 100,
          adjustable_quantity: {
            minimum: 100,
            maximum: 500,
            enabled: true,
          },
        },
      ],
      customer_email: user_email,
      currency: 'usd',
      success_url: `${env.HOST_NAME}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.HOST_NAME}/`,
    })
    /* eslint-enable */
    // console.log(ch);
    return ch
  }),
  getStripeSession: publicProcedure
    .input(z.object({
      sessionId: z.string(),
    }))
    .query(async ({ input }) => {
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      return {
        email: session.customer_details?.email
      }
    })
});