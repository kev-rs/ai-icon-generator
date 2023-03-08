// import { env } from "@/env.mjs";
import { loadStripe } from "@stripe/stripe-js";
// import { RouterOutputs } from "./api";

const stripePromise = loadStripe("pk_test_51Mj5tFHzrLSCk30cVnAPXcKb2aqcBnZvF5VLYJGttOBiqUtm3bAp2apo7QpKpJpuSNcFyf70FlqbXHNMn91tCFIa00zEX2c14p");

export async function checkout(id: string): Promise<void> {
  const stripe = await stripePromise;

  if (stripe) {
    const stripeCheck = await stripe.redirectToCheckout({ sessionId: id });

    if (stripeCheck.error) console.log(stripeCheck.error);
  }
}
