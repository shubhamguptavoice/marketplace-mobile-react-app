require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SCERITE);

export const createPaymentIntent_Post = async (req: any, res: any) => {
  console.log(req.body);
  try {
    const { price } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "INR",
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.send(e);
  }
};
