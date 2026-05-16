'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Loader, AlertCircle, Shield, Lock, CreditCard,
  ArrowLeft, Check, Calendar, User,
} from 'lucide-react';
import Header from '@/components/Header';

interface BookingDetails {
  _id: string;
  packageId: { name: string; price: number; description?: string };
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  status: string;
}

const paymentMethods = [
  { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
];

function formatCard(value: string) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}

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
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

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
    if (selectedMethod === 'card') {
      const digits = cardNumber.replace(/\s/g, '');
      if (digits.length < 16) { setError('Please enter a valid 16-digit card number.'); return; }
      if (expiry.length < 5) { setError('Please enter a valid expiry date (MM/YY).'); return; }
      if (cvc.length < 3) { setError('Please enter a valid CVC.'); return; }
    }
    setError('');
    setIsProcessing(true);
    try {
      const res = await fetch('/api/payments/demo-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });
      if (!res.ok) throw new Error('Payment failed');
      router.push(`/booking-confirmation/${bookingId}`);
    } catch (err: any) {
      setError(err.message || 'Payment processing failed. Please try again.');
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

  if (error || !booking) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {error ? 'Unable to Load Booking' : 'Booking Not Found'}
            </h2>
            <p className="text-slate-500 dark:text-gray-400 text-sm mb-6">
              {error || "This booking doesn't exist or you don't have permission to view it."}
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/bookings"><Button variant="outline" className="dark:border-gray-600 dark:text-gray-300">My Bookings</Button></Link>
              <Link href="/dashboard"><Button className="bg-blue-600 hover:bg-blue-700">Dashboard</Button></Link>
            </div>
          </div>
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

              {/* Payment method tabs */}
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
                          : 'border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <span>{m.icon}</span>{m.label}
                      {selectedMethod === m.id && <Check className="w-4 h-4 ml-auto text-blue-500" />}
                    </button>
                  ))}
                </div>

                {selectedMethod === 'card' ? (
                  <div className="space-y-4">
                    {/* Cardholder info (pre-filled, read-only) */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5 block">
                          <User className="w-3.5 h-3.5 text-slate-400" />Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={booking.customerName}
                          readOnly
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700/50 text-slate-700 dark:text-gray-300 text-sm cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5 block">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />Event Date
                        </label>
                        <input
                          type="text"
                          value={new Date(booking.bookingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          readOnly
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700/50 text-slate-700 dark:text-gray-300 text-sm cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Card number */}
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 block">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCard(e.target.value))}
                          maxLength={19}
                          className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest"
                        />
                      </div>
                    </div>

                    {/* Expiry + CVC */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 block">Expiry Date</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          maxLength={5}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5 block">CVC</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="123"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          maxLength={4}
                          className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Demo badge */}
                    <div className="flex items-center gap-2.5 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3.5">
                      <Shield className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        <strong>Demo mode</strong> — Enter any card details to simulate payment. No real charges will be made.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* PayPal placeholder */
                  <div className="bg-slate-50 dark:bg-gray-700/50 border border-slate-200 dark:border-gray-600 rounded-xl p-8 text-center">
                    <div className="text-4xl mb-3">🅿️</div>
                    <p className="text-slate-600 dark:text-gray-300 font-medium text-sm mb-1">PayPal Demo</p>
                    <p className="text-slate-400 dark:text-gray-500 text-xs">Click "Pay Now" below to simulate a PayPal payment.</p>
                  </div>
                )}
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
                  <><Lock className="w-5 h-5 mr-2" />Pay ${booking.packageId.price} Now</>
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
                    {booking.packageId.description && (
                      <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{booking.packageId.description}</p>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Customer</p>
                    <p className="text-slate-700 dark:text-gray-300 text-sm">{booking.customerName}</p>
                    <p className="text-slate-500 dark:text-gray-400 text-xs">{booking.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Event Date</p>
                    <p className="text-slate-700 dark:text-gray-300 text-sm">
                      {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 dark:border-gray-700 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
                      <span>Subtotal</span><span>${booking.packageId.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
                      <span>Platform fee</span>
                      <span className="text-green-600 dark:text-green-400">Free</span>
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
