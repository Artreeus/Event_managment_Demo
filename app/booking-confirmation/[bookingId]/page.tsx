'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader, CheckCircle, Calendar, Users, DollarSign, Mail, ArrowRight, Download, Share2, Sparkles } from 'lucide-react';
import Header from '@/components/Header';

interface BookingDetails {
  _id: string;
  packageId: { name: string; price: number };
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  status: string;
}

const steps = [
  { title: 'Confirmation Email', desc: 'A confirmation email has been sent with all the details.' },
  { title: 'Professional Contact', desc: 'Your service provider will reach out within 48 hours.' },
  { title: 'Event Day', desc: 'Enjoy your perfectly planned event!' },
];

export default function ConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') { router.push('/login'); return; }
    if (status === 'authenticated') {
      fetch(`/api/bookings/${bookingId}`)
        .then((r) => r.ok ? r.json() : Promise.reject())
        .then(setBooking)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [status, bookingId, router]);

  if (status === 'loading' || isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Success Hero */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-white/30">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-sm text-green-100 mb-4">
            <Sparkles className="w-4 h-4" />
            Payment Successful
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Booking Confirmed!</h1>
          <p className="text-green-100 text-lg max-w-md mx-auto">
            Your event has been successfully booked. Get ready for an amazing experience!
          </p>
        </div>
      </section>

      <div className="bg-slate-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4 max-w-2xl">

          {booking && (
            <>
              {/* Booking ID */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 mb-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider font-medium">Booking Reference</span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full border border-green-200 dark:border-green-800">
                    <CheckCircle className="w-3 h-3" />
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <p className="font-mono text-slate-800 dark:text-gray-200 font-medium">#{booking._id.slice(-12).toUpperCase()}</p>
              </div>

              {/* Details */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 mb-5">
                <h2 className="font-bold text-slate-900 dark:text-white mb-5 text-lg">Booking Details</h2>
                <div className="space-y-4">
                  {[
                    { icon: Users, label: 'Customer', value: booking.customerName },
                    { icon: Mail, label: 'Email', value: booking.customerEmail },
                    { icon: Calendar, label: 'Event Date', value: new Date(booking.bookingDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mb-0.5">{label}</p>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 dark:text-gray-400 mb-0.5">Service &amp; Amount</p>
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{booking.packageId.name}</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-0.5">${booking.packageId.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 mb-5">
                <h2 className="font-bold text-slate-900 dark:text-white mb-5 text-lg">What Happens Next?</h2>
                <div className="space-y-4">
                  {steps.map((s, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</div>
                      <div className="pt-0.5">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{s.title}</p>
                        <p className="text-slate-500 dark:text-gray-400 text-xs mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/bookings" className="flex-1">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View My Bookings <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/categories" className="flex-1">
                  <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                    Book More Services
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
