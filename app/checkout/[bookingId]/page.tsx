'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader, AlertCircle, Shield, Lock, CreditCard, ArrowLeft, Check } from 'lucide-react';
import Header from '@/components/Header';

interface BookingDetails {
  _id: string;
  packageId: { name: string; price: number };
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  status: string;
}

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
];

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('card');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?redirect=/checkout/${bookingId}`);
      return;
    }
    if (status === 'authenticated') {
      fetch(`/api/bookings/${bookingId}`)
        .then((r) => { if (!r.ok) throw new Error('Not found'); return r.json(); })
        .then(setBooking)
        .catch(() => setError('Failed to load booking details'))
        .finally(() => setIsLoading(false));
    }
  }, [status, bookingId, router]);

  const handlePayment = async () => {
    if (!booking) return;
    setError('');
    setIsProcessing(true);
    try {
      const res = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });
      if (!res.ok) throw new Error('Failed to create payment');
      const { clientSecret } = await res.json();
      setTimeout(async () => {
        try {
          const updateRes = await fetch('/api/payments/confirm', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ bookingId, clientSecret }),
          });
          if (updateRes.ok) {
            router.push(`/booking-confirmation/${bookingId}`);
          }
        } catch {
          setError('Payment processing failed');
          setIsProcessing(false);
        }
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Payment failed');
      setIsProcessing(false);
    }
  };

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

  if (!booking) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
          <p className="text-slate-600 dark:text-gray-400">Booking not found</p>
          <Link href="/dashboard"><Button>Back to Dashboard</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/bookings" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm mb-5">
            <ArrowLeft className="w-4 h-4" />Back to Bookings
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Secure Checkout</h1>
          <div className="flex items-center gap-2 text-slate-300 text-sm">
            <Lock className="w-4 h-4 text-green-400" />
            SSL encrypted payment — your data is safe
          </div>
        </div>
      </section>

      <div className="bg-slate-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Payment panel */}
            <div className="lg:col-span-2 space-y-5">
              {/* Payment method */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-500" />Payment Method
                </h2>
                <div className="flex gap-3 mb-6">
                  {paymentMethods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id)}
                      className={`flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                        selectedMethod === m.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
                      }`}
                    >
                      <span>{m.icon}</span>{m.label}
                      {selectedMethod === m.id && <Check className="w-4 h-4 ml-auto text-blue-500" />}
                    </button>
                  ))}
                </div>

                {/* Demo card form */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 block">Cardholder Name</label>
                    <input
                      type="text"
                      value={booking.customerName}
                      readOnly
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      value={booking.customerEmail}
                      readOnly
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-white text-sm"
                    />
                  </div>

                  {/* Stripe placeholder */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-750 border-2 border-dashed border-slate-300 dark:border-gray-600 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-slate-600 dark:text-gray-300 text-sm font-medium mb-1">Demo Checkout</p>
                    <p className="text-slate-400 dark:text-gray-500 text-xs">
                      In production, Stripe Elements would appear here for secure card entry.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3.5 flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl text-base font-semibold shadow-lg shadow-blue-200 dark:shadow-blue-950"
              >
                {isProcessing ? (
                  <><Loader className="w-5 h-5 mr-2 animate-spin" />Processing Payment...</>
                ) : (
                  <><Lock className="w-5 h-5 mr-2" />Pay ${booking.packageId.price} Securely</>
                )}
              </Button>

              <div className="flex items-center justify-center gap-6 text-xs text-slate-400 dark:text-gray-500">
                {['SSL Secured', 'No Hidden Fees', 'Refund Guaranteed'].map((t) => (
                  <div key={t} className="flex items-center gap-1"><Shield className="w-3 h-3" />{t}</div>
                ))}
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 sticky top-24">
                <h3 className="font-bold text-slate-900 dark:text-white mb-5">Order Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Service</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{booking.packageId.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Customer</p>
                    <p className="text-slate-700 dark:text-gray-300 text-sm">{booking.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Event Date</p>
                    <p className="text-slate-700 dark:text-gray-300 text-sm">
                      {new Date(booking.bookingDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 dark:border-gray-700 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
                      <span>Subtotal</span><span>${booking.packageId.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
                      <span>Platform fee</span><span className="text-green-600 dark:text-green-400">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <span className="font-semibold text-slate-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${booking.packageId.price}</span>
                  </div>

                  <Link href="/bookings">
                    <Button variant="outline" className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                      ← Back to Bookings
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
