'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  ArrowRight,
} from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'hello@eventbook.com', sub: 'We reply within 24 hours', href: 'mailto:hello@eventbook.com' },
  { icon: Phone, label: 'Call Us', value: '+1 (123) 456-7890', sub: 'Mon–Fri, 9am–6pm EST', href: 'tel:+11234567890' },
  { icon: MapPin, label: 'Visit Us', value: '123 Event St, New York', sub: 'NY 10001, United States', href: '#' },
  { icon: Clock, label: 'Support Hours', value: '24/7 Online Support', sub: 'Always here for you', href: '#' },
];

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#', color: 'hover:bg-sky-500' },
  { icon: Instagram, label: 'Instagram', href: '#', color: 'hover:bg-pink-500' },
  { icon: Facebook, label: 'Facebook', href: '#', color: 'hover:bg-blue-600' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: 'hover:bg-blue-700' },
];

const topics = ['General Inquiry', 'Booking Support', 'Vendor Partnership', 'Technical Issue', 'Billing Question', 'Media & Press', 'Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
              <MessageSquare className="w-4 h-4" />
              We&apos;d love to hear from you
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-5">Get in Touch</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Have a question, feedback, or want to partner with us? Our team is ready to help. Reach out through any channel that works best for you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all group"
              >
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                <p className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.value}</p>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{item.sub}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Send Us a Message</h2>
              <p className="text-slate-500 dark:text-gray-400 mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm mb-6">
                    Thanks for reaching out. We&apos;ll get back to you at <strong>{form.email}</strong> within 24 hours.
                  </p>
                  <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', topic: '', message: '' }); }} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Full Name</label>
                      <Input
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="rounded-xl border-slate-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 h-11"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Email Address</label>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="rounded-xl border-slate-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 h-11"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Topic</label>
                    <select
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select a topic...</option>
                      {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-11 bg-blue-600 hover:bg-blue-700 rounded-xl text-base font-medium">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* FAQ teaser */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Before You Write...</h3>
                <p className="text-slate-600 dark:text-gray-300 text-sm mb-4">
                  Check our FAQ page — you might find an instant answer to your question there.
                </p>
                <Link href="/faq">
                  <Button variant="outline" size="sm" className="w-full border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                    Browse FAQs <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Social */}
              <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Follow Us</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm mb-5">
                  Stay up to date with the latest news, tips, and event inspiration.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map(({ icon: Icon, label, href, color }) => (
                    <a key={label} href={href} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-gray-600 text-slate-600 dark:text-gray-300 text-sm hover:text-white ${color} transition-all group`}>
                      <Icon className="w-4 h-4" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">Team Online</span>
                </div>
                <p className="text-slate-500 dark:text-gray-400 text-sm">
                  Our average response time is <strong className="text-slate-900 dark:text-white">under 2 hours</strong> during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
