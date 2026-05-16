'use client';

import { useEffect, useState, useCallback } from 'react';
import { Loader, RefreshCw, Search, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  _id: string;
  packageId: { name: string; price: number } | null;
  userId: { name: string; email: string } | null;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'] as const;

const statusStyle: Record<string, string> = {
  pending:   'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
  confirmed: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700',
  completed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700',
};

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filtered, setFiltered] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
        setFiltered(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  useEffect(() => {
    let result = bookings;
    if (statusFilter !== 'all') result = result.filter(b => b.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.customerName.toLowerCase().includes(q) ||
        b.customerEmail.toLowerCase().includes(q) ||
        b.packageId?.name.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [search, statusFilter, bookings]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus as Booking['status'] } : b));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by customer, email or service..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-slate-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>
          <button onClick={fetchBookings} className="p-2.5 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-white">All Bookings</h3>
          <span className="text-sm text-slate-500 dark:text-gray-400">{filtered.length} results</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16"><Loader className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 dark:text-gray-400 text-sm">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-gray-700 bg-slate-50 dark:bg-gray-900/50">
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-gray-300">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-gray-300">Service</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-gray-300">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-gray-300">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-gray-300">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-600 dark:text-gray-300">Update</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(booking => (
                  <tr key={booking._id} className="border-b border-slate-100 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900 dark:text-white">{booking.customerName}</p>
                      <p className="text-xs text-slate-500 dark:text-gray-400">{booking.customerEmail}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-gray-300">
                      {booking.packageId?.name ?? <span className="text-slate-400 italic">Deleted</span>}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-gray-400 whitespace-nowrap">
                      {format(new Date(booking.bookingDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {booking.packageId ? `$${booking.packageId.price}` : '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle[booking.status]}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {updating === booking._id ? (
                        <Loader className="w-4 h-4 animate-spin text-blue-600" />
                      ) : (
                        <select
                          value={booking.status}
                          onChange={e => updateStatus(booking._id, e.target.value)}
                          className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-slate-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {STATUS_OPTIONS.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
