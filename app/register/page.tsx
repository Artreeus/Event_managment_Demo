'use client';

import { useState, useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertCircle,
  Loader,
  CheckCircle,
  Sparkles,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

// ── Password strength ────────────────────────────────────────────────────────
type StrengthLevel = 0 | 1 | 2 | 3 | 4;

const strengthConfig: Record<StrengthLevel, { label: string; color: string; bar: string }> = {
  0: { label: '', color: 'text-slate-400', bar: 'bg-slate-200' },
  1: { label: 'Weak', color: 'text-red-500', bar: 'bg-red-400' },
  2: { label: 'Fair', color: 'text-orange-500', bar: 'bg-orange-400' },
  3: { label: 'Good', color: 'text-yellow-600', bar: 'bg-yellow-400' },
  4: { label: 'Strong', color: 'text-green-600', bar: 'bg-green-500' },
};

function getPasswordStrength(pw: string): StrengthLevel {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return Math.min(score, 4) as StrengthLevel;
}

const passwordCriteria = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const strength = getPasswordStrength(form.password);
  const strengthInfo = strengthConfig[strength];

  // ── Per-field validation ────────────────────────────────────────────────
  const getFieldError = useCallback((field: string, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
        return '';
      case 'phone':
        if (value && !/^\+?[0-9\s\-().]{7,20}$/.test(value)) return 'Enter a valid phone number';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== form.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  }, [form.password]);

  const fieldError = (field: string) =>
    touched[field] ? getFieldError(field, (form as any)[field]) : '';

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setError('');
  };

  const handleBlur = (field: string) => () => setTouched((p) => ({ ...p, [field]: true }));

  const isFormValid = () => {
    const fields = ['name', 'email', 'password', 'confirmPassword'] as const;
    return fields.every((f) => !getFieldError(f, form[f])) && termsAccepted;
  };

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Touch all fields to show errors
    setTouched({ name: true, email: true, phone: true, password: true, confirmPassword: true });

    const fields = ['name', 'email', 'password', 'confirmPassword'] as const;
    for (const f of fields) {
      if (getFieldError(f, form[f])) return;
    }

    if (!termsAccepted) {
      setError('Please accept the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          phone: form.phone.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        return;
      }

      setSuccess(true);

      // Auto sign-in after short delay
      setTimeout(async () => {
        const result = await signIn('credentials', {
          email: form.email.trim().toLowerCase(),
          password: form.password,
          redirect: false,
        });
        if (result?.ok) router.push('/dashboard');
      }, 1800);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">
                Event<span className="text-blue-400">Book</span>
              </span>
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
            <div className="p-10 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re all set!</h2>
              <p className="text-slate-500 mb-1">
                Welcome to EventBook, <span className="font-semibold text-slate-700">{form.name.split(' ')[0]}</span>!
              </p>
              <p className="text-slate-400 text-sm mb-6">Setting up your account and signing you in...</p>
              <div className="flex items-center justify-center gap-2 text-blue-600">
                <Loader className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium">Redirecting to dashboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main form ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
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
          <p className="text-slate-400 text-sm mt-3">Join thousands planning perfect events</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600" />

          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
              <p className="text-slate-500 text-sm">Free forever. No credit card required.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange('name')}
                    onBlur={handleBlur('name')}
                    disabled={isLoading}
                    className={`pl-9 border-slate-200 rounded-xl h-11 focus-visible:ring-blue-500 ${
                      fieldError('name') ? 'border-red-400 focus-visible:ring-red-400' : ''
                    }`}
                    autoComplete="name"
                  />
                </div>
                {fieldError('name') && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{fieldError('name')}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="reg-email" className="text-sm font-medium text-slate-700">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    disabled={isLoading}
                    className={`pl-9 border-slate-200 rounded-xl h-11 focus-visible:ring-blue-500 ${
                      fieldError('email') ? 'border-red-400 focus-visible:ring-red-400' : ''
                    }`}
                    autoComplete="email"
                  />
                </div>
                {fieldError('email') && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{fieldError('email')}
                  </p>
                )}
              </div>

              {/* Phone (optional) */}
              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                  Phone Number
                  <span className="text-xs text-slate-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    disabled={isLoading}
                    className={`pl-9 border-slate-200 rounded-xl h-11 focus-visible:ring-blue-500 ${
                      fieldError('phone') ? 'border-red-400 focus-visible:ring-red-400' : ''
                    }`}
                    autoComplete="tel"
                  />
                </div>
                {fieldError('phone') && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{fieldError('phone')}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="reg-password" className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    disabled={isLoading}
                    className={`pl-9 pr-10 border-slate-200 rounded-xl h-11 focus-visible:ring-blue-500 ${
                      fieldError('password') ? 'border-red-400 focus-visible:ring-red-400' : ''
                    }`}
                    autoComplete="new-password"
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
                {fieldError('password') && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{fieldError('password')}
                  </p>
                )}

                {/* Strength meter */}
                {form.password.length > 0 && (
                  <div className="pt-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex gap-1 flex-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              i <= strength ? strengthInfo.bar : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs font-semibold ml-3 ${strengthInfo.color}`}>
                        {strengthInfo.label}
                      </span>
                    </div>
                    {/* Criteria checklist */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
                      {passwordCriteria.map((c) => {
                        const met = c.test(form.password);
                        return (
                          <div key={c.label} className={`flex items-center gap-1 text-xs ${met ? 'text-green-600' : 'text-slate-400'}`}>
                            <CheckCircle className={`w-3 h-3 flex-shrink-0 ${met ? 'text-green-500' : 'text-slate-300'}`} />
                            {c.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    disabled={isLoading}
                    className={`pl-9 pr-10 border-slate-200 rounded-xl h-11 focus-visible:ring-blue-500 ${
                      fieldError('confirmPassword') ? 'border-red-400 focus-visible:ring-red-400' : ''
                    } ${
                      touched.confirmPassword && !fieldError('confirmPassword') && form.confirmPassword
                        ? 'border-green-400' : ''
                    }`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {fieldError('confirmPassword') && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />{fieldError('confirmPassword')}
                  </p>
                )}
                {touched.confirmPassword && !fieldError('confirmPassword') && form.confirmPassword && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />Passwords match
                  </p>
                )}
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-blue-600 cursor-pointer flex-shrink-0"
                />
                <span className="text-sm text-slate-600 leading-snug">
                  I agree to the{' '}
                  <Link href="#" className="text-blue-600 font-medium hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-blue-600 font-medium hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <Button
                type="submit"
                disabled={isLoading || !termsAccepted}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium shadow-sm mt-1 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>Create Free Account <ArrowRight className="w-4 h-4 ml-1.5" /></>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Trust */}
        <div className="flex items-center justify-center gap-2 mt-5">
          <ShieldCheck className="w-4 h-4 text-slate-500" />
          <p className="text-slate-500 text-xs">Your data is encrypted and never shared.</p>
        </div>
      </div>
    </div>
  );
}
