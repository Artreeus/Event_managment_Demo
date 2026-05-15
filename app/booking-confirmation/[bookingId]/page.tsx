'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader, CheckCircle, Calendar, Users, DollarSign, Mail } from 'lucide-react';
import Header from '@/components/Header';

interface BookingDetails {
  _id: string;
  packageId: { name: string; price: number };
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  status: string;
}

export default function ConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      const fetchBooking = async () => {
        try {
          const response = await fetch(`/api/bookings/${bookingId}`);
          if (!response.ok) throw new Error('Booking not found');
          const data = await response.json();
          setBooking(data);
        } catch (err) {
          console.error('Error:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBooking();
    }
  }, [status, bookingId, router]);

  if (status === 'loading' || isLoading) {
    return (
      <main>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Success Banner */}
          <div className="mb-8">
            <Card className="border-green-200 bg-green-50">
              <CardContent className="pt-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-green-900 mb-2">
                  Booking Confirmed!
                </h1>
                <p className="text-green-700">
                  Your booking has been successfully processed.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Booking Details */}
          {booking && (
            <>
              <Card className="border-slate-200 mb-8">
                <CardHeader>
                  <CardTitle className="text-slate-900">Booking Details</CardTitle>
                  <CardDescription>
                    Reference ID: {booking._id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex items-start gap-4">
                      <Users className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-600">Customer</p>
                        <p className="font-medium text-slate-900">
                          {booking.customerName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-600">Email</p>
                        <p className="font-medium text-slate-900">
                          {booking.customerEmail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Calendar className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-600">Booking Date</p>
                        <p className="font-medium text-slate-900">
                          {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <DollarSign className="w-5 h-5 text-slate-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-slate-600">Service</p>
                        <p className="font-medium text-slate-900">
                          {booking.packageId.name}
                        </p>
                        <p className="text-lg font-bold text-slate-900 mt-1">
                          ${booking.packageId.price}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 mb-2">Status</p>
                      <Badge className={
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="border-slate-200 mb-8">
                <CardHeader>
                  <CardTitle className="text-slate-900">What&apos;s Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                        1
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Confirmation Email</p>
                        <p className="text-sm text-slate-600">
                          A confirmation email has been sent to {booking.customerEmail}
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                        2
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Service Provider</p>
                        <p className="text-sm text-slate-600">
                          Your service provider will contact you to confirm the details
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                        3
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">Service Date</p>
                        <p className="text-sm text-slate-600">
                          Your service will be provided on the confirmed date
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Link href="/bookings" className="flex-1">
                  <Button className="w-full">View My Bookings</Button>
                </Link>
                <Link href="/categories" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Book More Services
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
