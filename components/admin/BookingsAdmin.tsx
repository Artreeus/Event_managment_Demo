'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { formatDate } from 'date-fns';

interface Booking {
  _id: string;
  packageId: { name: string; price: number };
  customerName: string;
  customerEmail: string;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-slate-900">All Bookings</CardTitle>
        <CardDescription>
          {bookings.length} bookings total
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <p className="text-slate-600">No bookings yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">
                    Service
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b border-slate-200 hover:bg-slate-50"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-slate-900">
                          {booking.customerName}
                        </p>
                        <p className="text-sm text-slate-600">
                          {booking.customerEmail}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-900">
                      {booking.packageId.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {formatDate(new Date(booking.bookingDate), 'MMM dd, yyyy')}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      ${booking.packageId.price}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[booking.status]}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={booking.status}
                        onChange={(e) =>
                          updateBookingStatus(booking._id, e.target.value)
                        }
                        className="px-2 py-1 border border-slate-200 rounded text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
