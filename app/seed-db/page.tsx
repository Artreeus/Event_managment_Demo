'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SeedDBPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to seed database');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-6 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Database Seeding</h1>
          <p className="text-gray-300">Populate your database with demo data for testing</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-8 mb-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Demo Data Included</h2>
            <ul className="space-y-2 text-gray-200">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                6 Event Categories (Wedding, Birthday, Photography, Catering, Decoration, DJ)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                18 Service Packages (Silver, Gold, Platinum for each category)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                4 Demo Users (1 Admin, 3 Customers)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                3 Sample Bookings with different statuses
              </li>
            </ul>
          </div>

          {/* Seed Button */}
          <button
            onClick={handleSeed}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            {loading ? 'Seeding Database...' : 'Seed Database with Demo Data'}
          </button>
        </div>

        {/* Success Result */}
        {result && (
          <div className="bg-green-500/10 backdrop-blur-lg rounded-lg border border-green-500/30 p-8 mb-6">
            <h3 className="text-xl font-semibold text-green-400 mb-6">Successfully Seeded!</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Users</p>
                <p className="text-2xl font-bold text-white">{result.data.users}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Categories</p>
                <p className="text-2xl font-bold text-white">{result.data.categories}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Packages</p>
                <p className="text-2xl font-bold text-white">{result.data.packages}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-gray-400 text-sm">Bookings</p>
                <p className="text-2xl font-bold text-white">{result.data.bookings}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Demo Credentials</h4>
              <div className="space-y-3">
                {Object.entries(result.data.credentials).map(([key, creds]: [string, any]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                    <span className="text-gray-400 font-medium">{key}:</span>
                    <span className="text-gray-300">{creds.email}</span>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-300">{creds.password}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* Error Result */}
        {error && (
          <div className="bg-red-500/10 backdrop-blur-lg rounded-lg border border-red-500/30 p-8">
            <h3 className="text-xl font-semibold text-red-400 mb-3">Error</h3>
            <p className="text-gray-300 font-mono text-sm break-words">{error}</p>
          </div>
        )}

        {/* Info Section */}
        {!result && !error && (
          <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/20 p-8">
            <h3 className="text-lg font-semibold text-white mb-4">How to Use</h3>
            <ol className="space-y-3 text-gray-300 list-decimal list-inside">
              <li>Click the seed button above to populate the database</li>
              <li>Copy any of the demo credentials provided</li>
              <li>Use those credentials to log in and test the application</li>
              <li>You can create bookings, manage packages (as admin), and test payments</li>
            </ol>
          </div>
        )}
      </div>
    </main>
  );
}
