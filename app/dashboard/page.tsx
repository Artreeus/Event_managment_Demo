'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Loader, Calendar, Search, Settings, Shield, ChevronRight, User, Mail, BadgeCheck, LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const isAdmin = (session?.user as any)?.role === 'admin';
  const initial = (session?.user?.name || session?.user?.email || 'U')[0].toUpperCase();

  const quickActions = [
    { href: '/bookings', icon: Calendar, color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', border: 'border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600', title: 'My Bookings', description: 'View and manage all your event bookings', cta: 'View Bookings' },
    { href: '/categories', icon: Search, color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400', border: 'border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600', title: 'Browse Services', description: 'Explore and book new event services', cta: 'Browse Now' },
    { href: '#', icon: Settings, color: 'bg-slate-50 dark:bg-gray-800 text-slate-400 dark:text-gray-500', border: 'border-slate-100 dark:border-gray-700', title: 'Account Settings', description: 'Update your profile and preferences', cta: 'Coming Soon', disabled: true },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-5">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </div>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
              <span className="text-2xl font-bold text-white">{initial}</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-1">
                Welcome back, {session?.user?.name?.split(' ')[0] || 'User'}!
              </h1>
              <p className="text-slate-300">Manage your bookings and account from your personal dashboard</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50 dark:bg-gray-950 py-12 min-h-screen">
        <div className="container mx-auto px-4">

          {/* Quick Actions */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-200 ${
                    action.disabled ? 'cursor-default opacity-70' : `${action.border} hover:shadow-lg cursor-pointer`
                  }`}
                  onClick={action.disabled ? (e) => e.preventDefault() : undefined}
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{action.title}</h3>
                    <p className="text-slate-500 dark:text-gray-400 text-sm">{action.description}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${action.disabled ? 'text-slate-400 dark:text-gray-500' : 'text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all'}`}>
                    {action.cta}
                    {!action.disabled && <ChevronRight className="w-4 h-4" />}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Account Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-5">Account Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Full Name</p>
                    <p className="font-medium text-slate-900 dark:text-white">{session?.user?.name || '—'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Email Address</p>
                    <p className="font-medium text-slate-900 dark:text-white">{session?.user?.email}</p>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-gray-400">Role</p>
                      <p className="font-medium text-blue-600 dark:text-blue-400">Administrator</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isAdmin && (
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Admin Panel</h2>
                <p className="text-blue-100 text-sm mb-5">Manage categories, packages, and all platform bookings.</p>
                <Link href="/admin">
                  <Button className="bg-white text-blue-700 hover:bg-blue-50 font-medium">
                    Open Admin Panel <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
