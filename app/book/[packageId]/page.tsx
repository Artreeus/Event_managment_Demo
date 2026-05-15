'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';

interface Package {
  _id: string;
  name: string;
  price: number;
  description: string;
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
    const fetchPackage = async () => {
      try {
        const response = await fetch(`/api/packages?packageId=${packageId}`);
        if (!response.ok) throw new Error('Package not found');
        const data = await response.json();
        const foundPkg = data.find((p: any) => p._id === packageId);
        if (foundPkg) setPkg(foundPkg);
      } catch (err) {
        setError('Failed to load package details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackage();
  }, [packageId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId,
          ...formData,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Booking failed');
      }

      const booking = await response.json();
      setSuccess(true);

      setTimeout(() => {
        router.push(`/checkout/${booking._id}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
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

  if (!pkg) {
    return (
      <main>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-600 mb-4">Package not found</p>
            <Link href="/categories">
              <Button>Back to Categories</Button>
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
            {/* Form Section */}
            <div className="md:col-span-2">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-slate-900">Complete Your Booking</CardTitle>
                  <CardDescription>
                    Fill in your details to complete the booking process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    {success && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-600">Booking created! Redirecting to checkout...</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Full Name</label>
                      <Input
                        type="text"
                        value={formData.customerName}
                        onChange={(e) =>
                          setFormData({ ...formData, customerName: e.target.value })
                        }
                        disabled={isSubmitting}
                        className="border-slate-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Email</label>
                      <Input
                        type="email"
                        value={formData.customerEmail}
                        onChange={(e) =>
                          setFormData({ ...formData, customerEmail: e.target.value })
                        }
                        disabled={isSubmitting}
                        className="border-slate-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Phone Number</label>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.customerPhone}
                        onChange={(e) =>
                          setFormData({ ...formData, customerPhone: e.target.value })
                        }
                        disabled={isSubmitting}
                        className="border-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Booking Date</label>
                      <Input
                        type="datetime-local"
                        value={formData.bookingDate}
                        onChange={(e) =>
                          setFormData({ ...formData, bookingDate: e.target.value })
                        }
                        disabled={isSubmitting}
                        className="border-slate-200"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Additional Notes</label>
                      <Textarea
                        placeholder="Any special requests or notes..."
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        disabled={isSubmitting}
                        className="border-slate-200"
                        rows={4}
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                      {isSubmitting && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                      {isSubmitting ? 'Creating Booking...' : 'Continue to Payment'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Summary Section */}
            <div>
              <Card className="border-slate-200 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-slate-900">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Service</p>
                    <p className="font-semibold text-slate-900">{pkg.name}</p>
                  </div>

                  {pkg.description && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Description</p>
                      <p className="text-slate-700 text-sm">{pkg.description}</p>
                    </div>
                  )}

                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-slate-600">Price</p>
                      <p className="font-semibold text-slate-900">${pkg.price}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-sm text-slate-600 mb-1">Total</p>
                    <p className="text-2xl font-bold text-slate-900">${pkg.price}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
