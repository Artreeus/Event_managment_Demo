import { connectDB } from '@/lib/mongodb';
import { Booking } from '@/lib/models/Booking';
import { Payment } from '@/lib/models/Payment';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId } = await request.json();
    await connectDB();

    const booking = await Booking.findById(bookingId).populate('packageId');
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const payment = await Payment.findOne({ bookingId });
    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round((payment.amount as number) * 100),
      currency: payment.currency || 'usd',
      metadata: {
        bookingId: bookingId,
        paymentId: payment._id.toString(),
      },
    });

    payment.stripePaymentIntentId = paymentIntent.id;
    await payment.save();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
