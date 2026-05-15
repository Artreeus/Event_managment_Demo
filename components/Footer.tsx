import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, Twitter, Instagram, Facebook, Linkedin } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Browse Services', href: '/categories' },
    { label: 'Wedding Events', href: '/categories' },
    { label: 'Corporate Events', href: '/categories' },
    { label: 'Birthday Parties', href: '/categories' },
    { label: 'Conferences', href: '/categories' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/categories' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Event<span className="text-blue-400">Book</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your one-stop platform for discovering and booking professional event services.
              Making your special moments unforgettable.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href="mailto:hello@eventbook.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                hello@eventbook.com
              </a>
              <a
                href="tel:+11234567890"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                +1 (123) 456-7890
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                123 Event St, New York, NY 10001
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} EventBook. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
