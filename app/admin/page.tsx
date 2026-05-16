'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import {
  Loader, Shield, LayoutGrid, Package, Calendar,
  TrendingUp, Users, DollarSign, BookOpen,
} from 'lucide-react';
import CategoriesAdmin from '@/components/admin/CategoriesAdmin';
import PackagesAdmin from '@/components/admin/PackagesAdmin';
import BookingsAdmin from '@/components/admin/BookingsAdmin';

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  totalRevenue: number;
  totalCategories: number;
  totalPackages: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && (session?.user as any)?.role !== 'admin')) {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status !== 'authenticated' || (session?.user as any)?.role !== 'admin') return;
    Promise.all([
      fetch('/api/admin/bookings').then(r => r.ok ? r.json() : []),
      fetch('/api/categories').then(r => r.ok ? r.json() : []),
      fetch('/api/packages').then(r => r.ok ? r.json() : []),
    ]).then(([bookings, categories, packages]) => {
      const arr = Array.isArray(bookings) ? bookings : [];
      setStats({
        totalBookings: arr.length,
        pendingBookings: arr.filter((b: any) => b.status === 'pending').length,
        confirmedBookings: arr.filter((b: any) => b.status === 'confirmed').length,
        totalRevenue: arr.filter((b: any) => b.status !== 'cancelled').reduce((s: number, b: any) => s + (b.packageId?.price ?? 0), 0),
        totalCategories: Array.isArray(categories) ? categories.length : 0,
        totalPackages: Array.isArray(packages) ? packages.length : 0,
      });
    });
  }, [status, session]);

  if (status === 'loading') {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || (session?.user as any)?.role !== 'admin') return null;

  const statCards = [
    { label: 'Total Bookings',  value: stats?.totalBookings ?? '—',  icon: BookOpen,     bg: 'bg-blue-50 dark:bg-blue-900/30',   icon_color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Pending',         value: stats?.pendingBookings ?? '—', icon: Calendar,     bg: 'bg-yellow-50 dark:bg-yellow-900/30', icon_color: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Confirmed',       value: stats?.confirmedBookings ?? '—', icon: TrendingUp,  bg: 'bg-green-50 dark:bg-green-900/30',  icon_color: 'text-green-600 dark:text-green-400' },
    { label: 'Revenue',         value: stats ? `$${stats.totalRevenue.toLocaleString()}` : '—', icon: DollarSign, bg: 'bg-purple-50 dark:bg-purple-900/30', icon_color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Categories',      value: stats?.totalCategories ?? '—', icon: LayoutGrid,   bg: 'bg-indigo-50 dark:bg-indigo-900/30', icon_color: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Packages',        value: stats?.totalPackages ?? '—',   icon: Package,      bg: 'bg-pink-50 dark:bg-pink-900/30',   icon_color: 'text-pink-600 dark:text-pink-400' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-5">
            <Shield className="w-4 h-4" />
            Admin Panel
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">Admin Dashboard</h1>
              <p className="text-slate-300">Manage categories, packages, and all bookings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 dark:bg-gray-950 py-8 border-b border-slate-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {statCards.map((s) => (
              <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-4">
                <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <s.icon className={`w-4 h-4 ${s.icon_color}`} />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-10 bg-slate-50 dark:bg-gray-950 min-h-screen">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 p-1 rounded-xl mb-6 w-full sm:w-auto grid grid-cols-3 sm:flex">
              <TabsTrigger value="bookings" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Calendar className="w-4 h-4" /> Bookings
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <LayoutGrid className="w-4 h-4" /> Categories
              </TabsTrigger>
              <TabsTrigger value="packages" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Package className="w-4 h-4" /> Packages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings"><BookingsAdmin /></TabsContent>
            <TabsContent value="categories"><CategoriesAdmin /></TabsContent>
            <TabsContent value="packages"><PackagesAdmin /></TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
