import { connectDB } from '@/lib/mongodb';
import { Payment } from '@/lib/models/Payment';
import { Booking } from '@/lib/models/Booking';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bookingId } = await request.json();
    await connectDB();

    // Find and update payment
    const payment = await Payment.findOne({ bookingId });
    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    payment.status = 'succeeded';
    await payment.save();

    // Update booking status
    const booking = await Booking.findById(bookingId);
    if (booking) {
      booking.status = 'confirmed';
      await booking.save();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}
