'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
          Something Went Wrong
        </h1>
        <p className="text-slate-500 dark:text-gray-400 text-sm mb-8 leading-relaxed">
          An unexpected error occurred. Our team has been notified. Please try again or return home.
        </p>
        {error?.digest && (
          <p className="text-xs text-slate-400 dark:text-gray-600 font-mono mb-6">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
