'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Loader, Calendar, User, Phone, MessageSquare, CalendarDays, ArrowRight, Clock } from 'lucide-react';
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
  pending: { label: 'Pending', classes: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800' },
  confirmed: { label: 'Confirmed', classes: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800' },
  completed: { label: 'Completed', classes: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800' },
};

export default function BookingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/login'); return; }
    if (status === 'authenticated') {
      fetch('/api/bookings')
        .then((r) => { if (!r.ok) throw new Error('Failed'); return r.json(); })
        .then(setBookings)
        .catch(() => setError('Failed to load bookings'))
        .finally(() => setIsLoading(false));
    }
  }, [status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-slate-500 dark:text-gray-400 text-sm">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
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
              <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm self-start sm:self-auto">
                <span className="text-white font-semibold">{bookings.length}</span>
                <span className="text-slate-300 ml-1">{bookings.length === 1 ? 'booking' : 'bookings'} total</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-slate-50 dark:bg-gray-950 min-h-[50vh]">
        <div className="container mx-auto px-4">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-600 dark:text-red-400 mb-6 text-sm">{error}</div>
          )}

          {bookings.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-16 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <CalendarDays className="w-8 h-8 text-slate-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No bookings yet</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm mb-6 max-w-xs mx-auto">
                You haven&apos;t made any bookings yet. Browse our services to get started.
              </p>
              <Link href="/categories">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Browse Services <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const sc = statusConfig[booking.status] || statusConfig.pending;
                return (
                  <div key={booking._id} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">{booking.packageId.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Booked on {formatDate(new Date(booking.createdAt), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border self-start sm:self-auto ${sc.classes}`}>
                        {sc.label}
                      </span>
                    </div>
                    <div className="px-6 py-5">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <User className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mb-0.5">Customer</p>
                            <p className="font-medium text-slate-900 dark:text-white text-sm">{booking.customerName}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Calendar className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mb-0.5">Event Date</p>
                            <p className="font-medium text-slate-900 dark:text-white text-sm">
                              {formatDate(new Date(booking.bookingDate), 'MMM dd, yyyy HH:mm')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Phone className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mb-0.5">Phone</p>
                            <p className="font-medium text-slate-900 dark:text-white text-sm">{booking.customerPhone || 'Not provided'}</p>
                          </div>
                        </div>
                      </div>
                      {booking.notes && (
                        <div className="mt-4 flex items-start gap-3 bg-slate-50 dark:bg-gray-700/50 rounded-xl p-3">
                          <MessageSquare className="w-4 h-4 text-slate-400 dark:text-gray-500 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-600 dark:text-gray-300">{booking.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="px-6 py-4 bg-slate-50 dark:bg-gray-900/50 border-t border-slate-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-gray-400">Total Amount</p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">${booking.packageId.price}</p>
                      </div>
                      {booking.status === 'pending' && (
                        <Link href={`/checkout/${booking._id}`}>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Complete Payment <ArrowRight className="w-4 h-4 ml-2" />
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
