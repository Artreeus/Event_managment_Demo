'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { format } from 'date-fns';
import {
  Loader, Calendar, Search, Shield, ChevronRight,
  User, Mail, BadgeCheck, LayoutDashboard, Clock,
  CheckCircle, XCircle, AlertCircle, ArrowRight, Phone,
} from 'lucide-react';

interface Booking {
  _id: string;
  packageId: { name: string; price: number } | null;
  customerName: string;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const statusConfig: Record<string, { label: string; classes: string; icon: any }> = {
  pending:   { label: 'Pending',   icon: AlertCircle,   classes: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700' },
  confirmed: { label: 'Confirmed', icon: CheckCircle,   classes: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700' },
  completed: { label: 'Completed', icon: CheckCircle,   classes: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-700' },
  cancelled: { label: 'Cancelled', icon: XCircle,       classes: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-700' },
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/bookings')
      .then(r => r.ok ? r.json() : [])
      .then(data => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]))
      .finally(() => setBookingsLoading(false));
  }, [status]);

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

  if (status === 'unauthenticated') return null;

  const isAdmin = (session?.user as any)?.role === 'admin';
  const initial = (session?.user?.name || session?.user?.email || 'U')[0].toUpperCase();
  const firstName = session?.user?.name?.split(' ')[0] || 'there';

  // Stats
  const total     = bookings.length;
  const pending   = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const completed = bookings.filter(b => b.status === 'completed').length;

  const statCards = [
    { label: 'Total Bookings', value: total,     color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-900/30',    icon: Calendar },
    { label: 'Pending',        value: pending,   color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/30', icon: Clock },
    { label: 'Confirmed',      value: confirmed, color: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/30',  icon: CheckCircle },
    { label: 'Completed',      value: completed, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30', icon: BadgeCheck },
  ];

  const recentBookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-5">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </div>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
              <span className="text-2xl font-bold">{initial}</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">Welcome back, {firstName}!</h1>
              <p className="text-slate-300">Here's an overview of your account and bookings.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50 dark:bg-gray-950 min-h-screen py-10">
        <div className="container mx-auto px-4 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map(s => (
              <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5">
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className={`text-3xl font-bold ${s.color}`}>{bookingsLoading ? '—' : s.value}</p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Recent Bookings */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900 dark:text-white">Recent Bookings</h2>
                  <Link href="/bookings" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {bookingsLoading ? (
                  <div className="flex justify-center py-12"><Loader className="w-6 h-6 animate-spin text-blue-600" /></div>
                ) : recentBookings.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 bg-slate-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-7 h-7 text-slate-400 dark:text-gray-500" />
                    </div>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">No bookings yet</p>
                    <Link href="/categories">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Browse Services <ArrowRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-gray-700">
                    {recentBookings.map(b => {
                      const sc = statusConfig[b.status] ?? statusConfig.pending;
                      const StatusIcon = sc.icon;
                      return (
                        <div key={b._id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 dark:text-white text-sm truncate">
                              {b.packageId?.name ?? 'Service Package'}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(new Date(b.bookingDate), 'MMM dd, yyyy')}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            {b.packageId && (
                              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                ${b.packageId.price}
                              </span>
                            )}
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${sc.classes}`}>
                              <StatusIcon className="w-3 h-3" />
                              {sc.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {recentBookings.length > 0 && (
                  <div className="px-6 py-3 border-t border-slate-100 dark:border-gray-700">
                    <Link href="/bookings">
                      <Button variant="outline" size="sm" className="w-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
                        View All Bookings <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Account Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5">
                <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Account Info</h2>
                <div className="space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-gray-400">Name</p>
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{session?.user?.name || '—'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-slate-900 dark:text-white text-sm truncate">{session?.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-gray-400">Role</p>
                      <p className="font-medium text-slate-900 dark:text-white text-sm capitalize">
                        {isAdmin ? <span className="text-blue-600 dark:text-blue-400">Administrator</span> : 'Customer'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5">
                <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="space-y-2">
                  <Link href="/bookings" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-slate-700 dark:text-gray-200">My Bookings</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-gray-200 transition-colors" />
                  </Link>
                  <Link href="/categories" className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <Search className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-slate-700 dark:text-gray-200">Browse Services</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-gray-200 transition-colors" />
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group">
                      <div className="flex items-center gap-2.5">
                        <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">Admin Panel</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600 transition-colors" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Admin card */}
              {isAdmin && (
                <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-5 text-white">
                  <Shield className="w-8 h-8 text-white/80 mb-3" />
                  <h3 className="font-semibold mb-1">Admin Panel</h3>
                  <p className="text-blue-100 text-xs mb-4">Manage all bookings, categories and packages.</p>
                  <Link href="/admin">
                    <Button className="bg-white text-blue-700 hover:bg-blue-50 font-medium w-full">
                      Open Admin Panel <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
