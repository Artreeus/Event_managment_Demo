'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Loader, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        return;
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        signIn('credentials', {
          email,
          password,
          redirect: false,
        }).then((result) => {
          if (result?.ok) {
            router.push('/dashboard');
          }
        });
      }, 1500);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border-slate-200">
          <CardHeader>
            <CardTitle className="text-slate-900">Create Account</CardTitle>
            <CardDescription>
              Sign up to start booking services
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
                  <p className="text-sm text-green-600">Account created! Signing you in...</p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="border-slate-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="border-slate-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="border-slate-200"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-900">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="border-slate-200"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || success}
                className="w-full"
              >
                {isLoading && <Loader className="w-4 h-4 mr-2 animate-spin" />}
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            <p className="text-center text-slate-600 text-sm mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
