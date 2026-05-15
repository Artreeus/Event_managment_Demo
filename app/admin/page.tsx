'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { Loader } from 'lucide-react';
import CategoriesAdmin from '@/components/admin/CategoriesAdmin';
import PackagesAdmin from '@/components/admin/PackagesAdmin';
import BookingsAdmin from '@/components/admin/BookingsAdmin';

export default function AdminDashboard() {
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

  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') {
    router.push('/');
    return null;
  }

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600">
              Manage categories, packages, and bookings
            </p>
          </div>

          <Tabs defaultValue="categories" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="packages">Packages</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="mt-6">
              <CategoriesAdmin />
            </TabsContent>

            <TabsContent value="packages" className="mt-6">
              <PackagesAdmin />
            </TabsContent>

            <TabsContent value="bookings" className="mt-6">
              <BookingsAdmin />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
