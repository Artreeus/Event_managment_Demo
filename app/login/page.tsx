'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertCircle,
  Loader,
  Sparkles,
  Eye,
  EyeOff,
  CheckCircle,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

const DEMO_EMAIL = 'admin@example.com';
const DEMO_PASSWORD = 'password123';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Pre-fill remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('eb_remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const validateFields = useCallback(() => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (result?.ok) {
        if (rememberMe) {
          localStorage.setItem('eb_remembered_email', email.trim().toLowerCase());
        } else {
          localStorage.removeItem('eb_remembered_email');
        }
        setLoginSuccess(true);
        setTimeout(() => router.push(callbackUrl), 800);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setFieldErrors({});
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">
              Event<span className="text-blue-400">Book</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm mt-3">The #1 platform for event professionals</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          {/* Card top accent */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600" />

          <div className="p-8">
            {loginSuccess ? (
              /* Success state */
              <div className="py-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Welcome back!</h2>
                <p className="text-slate-500 text-sm">Redirecting to your dashboard...</p>
                <div className="flex justify-center mt-4">
                  <Loader className="w-5 h-5 animate-spin text-blue-600" />
                </div>
              </div>
            ) : (
              <>
                <div className="mb-7">
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
                  <p className="text-slate-500 text-sm">Sign in to your EventBook account</p>
                </div>

                {/* Demo credentials banner */}
                <button
                  type="button"
                  onClick={fillDemo}
                  className="w-full mb-5 flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-xl px-4 py-3 transition-colors group"
                >
                  <div className="text-left">
                    <p className="text-xs font-semibold text-blue-700">Try Demo Account</p>
                    <p className="text-xs text-blue-500 mt-0.5">{DEMO_EMAIL}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600 font-medium group-hover:gap-2 transition-all">
                    Fill in <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-xs text-slate-400 font-medium">or sign in with your account</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Top-level error */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-2.5 animate-in slide-in-from-top-1">
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                        }}
                        disabled={isLoading}
                        className={`pl-9 border-slate-200 rounded-xl h-11 focus-visible:ring-blue-500 ${
                          fieldErrors.email ? 'border-red-400 focus-visible:ring-red-400' : ''
                        }`}
                        autoComplete="email"
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />{fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-slate-700">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-blue-600 hover:text-blue-700 transition-colors font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: undefined }));
                        }}
                        disabled={isLoading}
                        className={`pl-9 pr-10 border-slate-200 rounded-xl h-11 focus-visible:ring-blue-500 ${
                          fieldErrors.password ? 'border-red-400 focus-visible:ring-red-400' : ''
                        }`}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />{fieldErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Remember me */}
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-slate-600">Remember me for 30 days</span>
                  </label>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      <>Sign In <ArrowRight className="w-4 h-4 ml-1.5" /></>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                  <p className="text-slate-500 text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                      Create one free
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Trust badge */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <ShieldCheck className="w-4 h-4 text-slate-500" />
          <p className="text-slate-500 text-xs">
            Secured with 256-bit SSL encryption. Your data is safe with us.
          </p>
        </div>

        <p className="text-center text-slate-600 text-xs mt-3">
          By signing in, you agree to our{' '}
          <Link href="#" className="text-slate-400 underline hover:text-slate-300">Terms</Link>
          {' '}and{' '}
          <Link href="#" className="text-slate-400 underline hover:text-slate-300">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
