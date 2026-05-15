import { connectDB } from '@/lib/mongodb';
import { Booking } from '@/lib/models/Booking';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await auth();
    if (!session || (session.user as any)?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const bookings = await Booking.find()
      .populate('packageId')
      .populate('userId', 'name email')
      .sort('-createdAt');

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Admin bookings fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
