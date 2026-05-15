'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import {
  Loader,
  Calendar,
  User,
  Phone,
  MessageSquare,
  CalendarDays,
  ArrowRight,
  Clock,
} from 'lucide-react';
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

const statusConfig: Record<string, { label: string; classes: string }> = {
  pending: { label: 'Pending', classes: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  confirmed: { label: 'Confirmed', classes: 'bg-green-100 text-green-800 border-green-200' },
  completed: { label: 'Completed', classes: 'bg-blue-100 text-blue-800 border-blue-200' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-800 border-red-200' },
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
      fetch('/api/bookings')
        .then((r) => {
          if (!r.ok) throw new Error('Failed to fetch');
          return r.json();
        })
        .then(setBookings)
        .catch(() => setError('Failed to load bookings'))
        .finally(() => setIsLoading(false));
    }
  }, [status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-slate-500 text-sm">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-4">
            <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <span>/</span>
            <span>My Bookings</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">My Bookings</h1>
              <p className="text-slate-300">Track and manage all your event bookings</p>
            </div>
            {bookings.length > 0 && (
              <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm">
                <span className="text-white font-semibold">{bookings.length}</span>
                <span className="text-slate-300 ml-1">{bookings.length === 1 ? 'booking' : 'bookings'} total</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-slate-50 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 mb-6 text-sm">
              {error}
            </div>
          )}

          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CalendarDays className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No bookings yet</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                You haven&apos;t made any bookings yet. Browse our services to get started.
              </p>
              <Link href="/categories">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const sc = statusConfig[booking.status] || statusConfig.pending;
                return (
                  <div
                    key={booking._id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Card Header */}
                    <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {booking.packageId.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Booked on {formatDate(new Date(booking.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-auto ${sc.classes}`}
                      >
                        {sc.label}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="px-6 py-5">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Customer</p>
                            <p className="font-medium text-slate-900 text-sm">{booking.customerName}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Calendar className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Event Date</p>
                            <p className="font-medium text-slate-900 text-sm">
                              {formatDate(new Date(booking.bookingDate), 'MMM dd, yyyy HH:mm')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Phone className="w-4 h-4 text-slate-500" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                            <p className="font-medium text-slate-900 text-sm">
                              {booking.customerPhone || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="mt-4 flex items-start gap-3 bg-slate-50 rounded-xl p-3">
                          <MessageSquare className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-600">{booking.notes}</p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-500">Total Amount</p>
                        <p className="text-2xl font-bold text-slate-900">
                          ${booking.packageId.price}
                        </p>
                      </div>
                      {booking.status === 'pending' && (
                        <Link href={`/checkout/${booking._id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Complete Payment
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
