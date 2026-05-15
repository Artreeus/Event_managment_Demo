import { connectDB } from '@/lib/mongodb';
import { Payment } from '@/lib/models/Payment';
import { Booking } from '@/lib/models/Booking';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error('Webhook signature verification failed', error);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    await connectDB();

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const metadata = paymentIntent.metadata;

      const payment = await Payment.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      if (payment) {
        payment.status = 'succeeded';
        await payment.save();

        const booking = await Booking.findById(metadata.bookingId);
        if (booking) {
          booking.status = 'confirmed';
          await booking.save();
        }
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const payment = await Payment.findOne({
        stripePaymentIntentId: paymentIntent.id,
      });

      if (payment) {
        payment.status = 'failed';
        await payment.save();
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook failed' },
      { status: 500 }
    );
  }
}
