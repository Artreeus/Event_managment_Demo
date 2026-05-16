import { connectDB } from '@/lib/mongodb';
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

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Verify ownership
    const isAdmin = (session.user as any)?.role === 'admin';
    if (!isAdmin && booking.userId.toString() !== (session.user as any)?.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    booking.status = 'confirmed';
    await booking.save();

    return NextResponse.json({ success: true, bookingId });
  } catch (error) {
    console.error('Demo confirm error:', error);
    return NextResponse.json({ error: 'Payment confirmation failed' }, { status: 500 });
  }
}
