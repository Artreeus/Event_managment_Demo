'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Loader, CheckCircle, ArrowLeft, Shield, Calendar, User, Phone, FileText, Tag } from 'lucide-react';
import Header from '@/components/Header';

interface Package {
  _id: string;
  name: string;
  price: number;
  description: string;
  duration?: string;
  features?: string[];
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const packageId = params.packageId as string;

  const [pkg, setPkg] = useState<Package | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    notes: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(`/login?redirect=/book/${packageId}`);
      return;
    }
    if (status === 'authenticated' && session?.user) {
      setFormData((prev) => ({
        ...prev,
        customerName: session.user?.name || '',
        customerEmail: session.user?.email || '',
      }));
    }
  }, [status, session, packageId, router]);

  useEffect(() => {
    fetch(`/api/packages?packageId=${packageId}`)
      .then((r) => r.json())
      .then((data) => {
        const found = data.find((p: any) => p._id === packageId);
        if (found) setPkg(found);
      })
      .catch(() => setError('Failed to load package details'))
      .finally(() => setIsLoading(false));
  }, [packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId, ...formData }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Booking failed');
      }
      const booking = await response.json();
      setSuccess(true);
      setTimeout(() => router.push(`/checkout/${booking._id}`), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const field = (label: string, icon: React.ReactNode, content: React.ReactNode) => (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700 dark:text-gray-300 flex items-center gap-1.5">
        {icon}{label}
      </label>
      {content}
    </div>
  );

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

  if (!pkg) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
          <p className="text-slate-600 dark:text-gray-400">Package not found</p>
          <Link href="/categories"><Button>Back to Categories</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/categories" className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm mb-5">
            <ArrowLeft className="w-4 h-4" />Back to Categories
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Complete Your Booking</h1>
          <p className="text-slate-300">You&apos;re just a few steps away from booking <strong className="text-white">{pkg.name}</strong></p>
        </div>
      </section>

      <div className="bg-slate-50 dark:bg-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-8">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Your Details</h2>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-7">Fill in your information to complete the booking</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3.5 flex items-start gap-2.5">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3.5 flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-600 dark:text-green-400">Booking created! Redirecting to checkout...</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    {field('Full Name', <User className="w-3.5 h-3.5 text-slate-400" />,
                      <Input value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} disabled={isSubmitting} className="h-11 rounded-xl border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white" required />
                    )}
                    {field('Email Address', <FileText className="w-3.5 h-3.5 text-slate-400" />,
                      <Input type="email" value={formData.customerEmail} onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })} disabled={isSubmitting} className="h-11 rounded-xl border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white" required />
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {field('Phone Number', <Phone className="w-3.5 h-3.5 text-slate-400" />,
                      <Input type="tel" placeholder="+1 (555) 123-4567" value={formData.customerPhone} onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })} disabled={isSubmitting} className="h-11 rounded-xl border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" />
                    )}
                    {field('Event Date & Time', <Calendar className="w-3.5 h-3.5 text-slate-400" />,
                      <Input type="datetime-local" value={formData.bookingDate} onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })} disabled={isSubmitting} className="h-11 rounded-xl border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white" required />
                    )}
                  </div>

                  {field('Additional Notes (Optional)', <FileText className="w-3.5 h-3.5 text-slate-400" />,
                    <Textarea placeholder="Any special requests, event theme, dietary requirements, or other details..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} disabled={isSubmitting} className="rounded-xl border-slate-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500" rows={4} />
                  )}

                  <div className="pt-2">
                    <Button type="submit" disabled={isSubmitting || success} className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium shadow-sm">
                      {isSubmitting ? (
                        <><Loader className="w-4 h-4 mr-2 animate-spin" />Creating Booking...</>
                      ) : 'Continue to Payment →'}
                    </Button>
                    <p className="text-center text-xs text-slate-500 dark:text-gray-400 mt-3 flex items-center justify-center gap-1">
                      <Shield className="w-3.5 h-3.5" />Secured with 256-bit SSL encryption
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6 sticky top-24">
                <h3 className="font-bold text-slate-900 dark:text-white mb-5 text-lg">Booking Summary</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Service</p>
                    <p className="font-semibold text-slate-900 dark:text-white">{pkg.name}</p>
                  </div>

                  {pkg.description && (
                    <div>
                      <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">Description</p>
                      <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{pkg.description}</p>
                    </div>
                  )}

                  {pkg.duration && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300">
                      <Tag className="w-4 h-4 text-blue-500" />
                      {pkg.duration}
                    </div>
                  )}

                  <div className="border-t border-slate-100 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400 mb-2">
                      <span>Subtotal</span><span>${pkg.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400 mb-3">
                      <span>Booking fee</span><span className="text-green-600 dark:text-green-400">Free</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <span className="font-semibold text-slate-900 dark:text-white">Total</span>
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${pkg.price}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-100 dark:border-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500 dark:text-gray-400">
                      Your booking is protected by our <span className="text-slate-700 dark:text-gray-300 font-medium">satisfaction guarantee</span>. Full refund available up to 7 days before the event.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
