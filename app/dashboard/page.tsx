'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Loader } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <main>
        <Header />
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </main>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Welcome, {session?.user?.name || 'User'}!
            </h1>
            <p className="text-slate-600">
              Manage your bookings and account from here
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/bookings">
              <Card className="border-slate-200 hover:shadow-lg transition cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-slate-900">My Bookings</CardTitle>
                  <CardDescription>
                    View and manage your bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Bookings</Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/categories">
              <Card className="border-slate-200 hover:shadow-lg transition cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-slate-900">Browse Services</CardTitle>
                  <CardDescription>
                    Explore and book new services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Browse</Button>
                </CardContent>
              </Card>
            </Link>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Account Settings</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-slate-900">Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600">Name</p>
                    <p className="font-medium text-slate-900">{session?.user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Email</p>
                    <p className="font-medium text-slate-900">{session?.user?.email}</p>
                  </div>
                  {(session?.user as any)?.role === 'admin' && (
                    <div>
                      <p className="text-sm text-slate-600">Role</p>
                      <p className="font-medium text-slate-900">Admin</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
