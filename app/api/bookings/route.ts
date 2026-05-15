import { connectDB } from '@/lib/mongodb';
import { Booking } from '@/lib/models/Booking';
import { Payment } from '@/lib/models/Payment';
import { Package } from '@/lib/models/Package';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const bookings = await Booking.find({ userId: session.user?.id })
      .populate('packageId')
      .populate('paymentId');

    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();

    const pkg = await Package.findById(body.packageId);
    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 });
    }

    const booking = new Booking({
      ...body,
      userId: session.user?.id,
    });

    await booking.save();

    // Create payment record
    const payment = new Payment({
      bookingId: booking._id,
      amount: pkg.price,
      currency: 'usd',
      status: 'pending',
    });

    await payment.save();
    booking.paymentId = payment._id;
    await booking.save();

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
