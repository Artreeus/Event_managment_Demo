'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Loader, Calendar, User, Phone, MessageSquare } from 'lucide-react';
import { formatDate } from 'date-fns';

interface Booking {
  _id: string;
  packageId: { name: string; price: number };
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      const fetchBookings = async () => {
        try {
          const response = await fetch('/api/bookings');
          if (!response.ok) throw new Error('Failed to fetch');
          const data = await response.json();
          setBookings(data);
        } catch (err) {
          setError('Failed to load bookings');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBookings();
    }
  }, [status, router]);

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
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">My Bookings</h1>
            <p className="text-slate-600">View and manage all your bookings</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 mb-6">
              {error}
            </div>
          )}

          {bookings.length === 0 ? (
            <Card className="border-slate-200">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-slate-600 mb-4">No bookings yet</p>
                <Button onClick={() => router.push('/categories')}>
                  Browse Services
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking._id} className="border-slate-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-slate-900">
                          {booking.packageId.name}
                        </CardTitle>
                        <CardDescription>
                          Booked on {formatDate(new Date(booking.createdAt), 'MMM dd, yyyy')}
                        </CardDescription>
                      </div>
                      <Badge className={`${statusColors[booking.status]}`}>
                        {booking.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">Customer</p>
                            <p className="font-medium text-slate-900">
                              {booking.customerName}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">Booking Date</p>
                            <p className="font-medium text-slate-900">
                              {formatDate(new Date(booking.bookingDate), 'MMM dd, yyyy HH:mm')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="text-sm text-slate-600">Phone</p>
                            <p className="font-medium text-slate-900">
                              {booking.customerPhone || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-slate-600 mb-2">Price</p>
                          <p className="text-2xl font-bold text-slate-900">
                            ${booking.packageId.price}
                          </p>
                        </div>

                        {booking.notes && (
                          <div className="flex items-start gap-3">
                            <MessageSquare className="w-5 h-5 text-slate-400 mt-1" />
                            <div>
                              <p className="text-sm text-slate-600">Notes</p>
                              <p className="text-slate-700">{booking.notes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {booking.status === 'pending' && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <Button className="w-full">
                          Complete Payment
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
