'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, AlertCircle, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';

interface BookingDetails {
  _id: string;
  packageId: { name: string; price: number };
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  status: string;
  paymentId?: string;
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
  const [paymentMethodId, setPaymentMethodId] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?redirect=/checkout/${bookingId}`);
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
          setError('Failed to load booking details');
        } finally {
          setIsLoading(false);
        }
      };

      fetchBooking();
    }
  }, [status, bookingId, router]);

  const handlePayment = async () => {
    if (!booking) return;

    setError('');
    setIsProcessing(true);

    try {
      // Create payment intent
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });

      if (!response.ok) throw new Error('Failed to create payment');

      const { clientSecret } = await response.json();

      // In a real implementation, you would use Stripe.js to handle the payment
      // For now, we'll simulate a successful payment
      // In production, use @stripe/react-stripe-js and elements
      
      setTimeout(async () => {
        try {
          // Mark payment as succeeded (in production, this would be handled by webhook)
          const updateResponse = await fetch(`/api/payments/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId,
              clientSecret,
            }),
          });

          if (updateResponse.ok) {
            router.push(`/booking-confirmation/${bookingId}`);
          }
        } catch (err) {
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
      <main>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-600 mb-4">Booking not found</p>
            <Link href="/dashboard">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Payment Form Section */}
            <div className="md:col-span-2">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">Complete Payment</CardTitle>
                  <CardDescription>
                    Secure payment powered by Stripe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <p className="text-slate-600 mb-4">
                      This is a demo checkout. In production, Stripe Elements would appear here.
                    </p>
                    <p className="text-sm text-slate-500">
                      Your payment information would be processed securely through Stripe.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-900">Email</label>
                      <input
                        type="email"
                        value={booking.customerEmail}
                        disabled
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-900">Cardholder Name</label>
                      <input
                        type="text"
                        value={booking.customerName}
                        disabled
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 mt-1"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    size="lg"
                    className="w-full"
                  >
                    {isProcessing && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                    {isProcessing ? 'Processing Payment...' : 'Pay Now'}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    Your payment information is secure and encrypted.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="border-slate-200 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-slate-900">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Service</p>
                    <p className="font-semibold text-slate-900">
                      {booking.packageId.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-600 mb-1">Customer</p>
                    <p className="font-medium text-slate-900">
                      {booking.customerName}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-slate-600">Price</p>
                      <p className="font-semibold text-slate-900">
                        ${booking.packageId.price}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-slate-600">Tax</p>
                      <p className="font-semibold text-slate-900">$0.00</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">Total</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${booking.packageId.price}
                    </p>
                  </div>

                  <Link href={`/bookings`}>
                    <Button variant="outline" className="w-full">
                      Back to Bookings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
