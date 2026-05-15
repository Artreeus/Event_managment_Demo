'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  Sparkles,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  Calendar,
  Shield,
  LogOut,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { href: '/categories', label: 'Browse Services' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const userInitial = (session?.user?.name || session?.user?.email || 'U')[0].toUpperCase();
  const displayName = session?.user?.name?.split(' ')[0] || session?.user?.email;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-gray-800'
          : 'bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-800'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
              Event<span className="text-blue-600">Book</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 pr-2 font-medium hover:bg-slate-50 dark:hover:bg-gray-800 dark:text-gray-200"
                  >
                    <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{userInitial}</span>
                    </div>
                    <span className="hidden sm:inline text-sm">{displayName}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 dark:text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 dark:bg-gray-800 dark:border-gray-700">
                  <div className="px-3 py-2.5 border-b border-slate-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{session.user?.name}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400 truncate mt-0.5">{session.user?.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center gap-2.5 cursor-pointer dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                      <LayoutDashboard className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/bookings" className="flex items-center gap-2.5 cursor-pointer dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                      <Calendar className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  {(session.user as any)?.role === 'admin' && (
                    <>
                      <DropdownMenuSeparator className="dark:bg-gray-700" />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="flex items-center gap-2.5 cursor-pointer dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700">
                          <Shield className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="dark:bg-gray-700" />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-red-600 flex items-center gap-2.5 cursor-pointer focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="hidden sm:flex text-slate-600 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors ml-1"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label="Toggle menu"
            >
              {isMobileOpen
                ? <X className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                : <Menu className="w-5 h-5 text-slate-700 dark:text-gray-300" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!session && (
              <div className="pt-3 mt-2 border-t border-slate-100 dark:border-gray-800 flex flex-col gap-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
