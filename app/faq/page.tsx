'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ChevronDown, HelpCircle, ArrowRight, Search, MessageSquare } from 'lucide-react';

const faqCategories = [
  {
    id: 'general',
    label: 'General',
    faqs: [
      { q: 'What is EventBook?', a: 'EventBook is a professional event booking platform that connects you with vetted event service providers. Whether you need catering, photography, entertainment, decorations, or full event planning — you can browse, compare, and book everything in one place.' },
      { q: 'How does EventBook work?', a: 'It\'s simple! Browse our service categories, select a package that fits your needs and budget, fill in your event details, and confirm your booking with a secure payment. Our team handles the rest and ensures everything goes smoothly on your event day.' },
      { q: 'Is EventBook free to use?', a: 'Browsing and creating an account are completely free. You only pay when you book a service. There are no hidden booking fees — the price you see is the price you pay.' },
      { q: 'What types of events do you support?', a: 'We support a wide range of events including weddings, corporate meetings, birthday parties, baby showers, anniversary celebrations, product launches, conferences, graduations, and more.' },
    ],
  },
  {
    id: 'booking',
    label: 'Booking',
    faqs: [
      { q: 'How do I make a booking?', a: 'Browse our service categories, find a package you like, click "Book Now", fill in your event details (name, date, notes), and confirm. You\'ll receive an email confirmation and can track your booking from your dashboard.' },
      { q: 'Can I modify my booking after confirming?', a: 'Yes! You can request modifications to your booking through your dashboard or by contacting our support team. Changes are subject to availability and the service provider\'s policies.' },
      { q: 'How far in advance should I book?', a: 'We recommend booking at least 2–4 weeks in advance for most services. For peak seasons (summer weddings, holiday parties) or large events, booking 2–3 months ahead ensures availability and gives professionals ample preparation time.' },
      { q: 'What happens after I book?', a: 'After booking, you\'ll receive a confirmation email. The service provider will reach out within 48 hours to discuss details and requirements. Your booking status will update in your dashboard as it progresses.' },
    ],
  },
  {
    id: 'payment',
    label: 'Payment & Pricing',
    faqs: [
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for larger bookings. All payments are processed through our secure, encrypted payment system.' },
      { q: 'Is my payment information safe?', a: 'Absolutely. We use Stripe for payment processing, which is PCI-DSS compliant and uses bank-level encryption. We never store your full card details on our servers.' },
      { q: 'Are there any additional fees?', a: 'No hidden fees! The price displayed on each package is the final price. Some premium packages may require a deposit upfront with the remainder due closer to the event — this will be clearly stated in the package details.' },
      { q: 'Can I get a refund?', a: 'Yes. We offer full refunds for cancellations made more than 7 days before the event. Cancellations within 7 days may be eligible for a partial refund depending on the service provider\'s policy. See our full refund policy for details.' },
    ],
  },
  {
    id: 'professionals',
    label: 'Our Professionals',
    faqs: [
      { q: 'How are professionals vetted?', a: 'Every professional on EventBook goes through a thorough verification process including identity verification, license and certification checks, reference checks, and a review of their portfolio and past work. We also monitor ongoing reviews and ratings.' },
      { q: 'What if I\'m not happy with the service?', a: 'Your satisfaction is our top priority. If you\'re not satisfied, contact us within 48 hours of your event and we\'ll work to resolve the issue. Eligible cases may receive a partial or full refund, or a rebook with a different professional at no extra cost.' },
      { q: 'Can I request a specific professional again?', a: 'Yes! If you loved working with a specific professional, you can view their profile from your past booking and book them directly for your next event.' },
      { q: 'How are reviews collected?', a: 'After each completed event, both the customer and the professional are invited to leave a review. All reviews are verified and tied to real bookings — no fake reviews are allowed on our platform.' },
    ],
  },
  {
    id: 'account',
    label: 'Account & Privacy',
    faqs: [
      { q: 'How do I create an account?', a: 'Click "Get Started" in the top navigation, enter your name, email, and a password. That\'s it! Your account is instantly created and you can start browsing services right away.' },
      { q: 'How do I reset my password?', a: 'On the login page, click "Forgot password?" and enter your email address. We\'ll send you a secure reset link within a few minutes. Check your spam folder if you don\'t see it.' },
      { q: 'How is my personal data used?', a: 'We use your data only to provide and improve our services — processing bookings, communicating about your events, and personalizing your experience. We never sell your data to third parties. Read our full Privacy Policy for details.' },
      { q: 'Can I delete my account?', a: 'Yes, you can request account deletion at any time by contacting our support team. We\'ll process your request within 30 days and remove all personal data in accordance with applicable privacy laws.' },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const activeCategory_data = faqCategories.find((c) => c.id === activeCategory);

  const filteredFaqs = search
    ? faqCategories.flatMap((cat) =>
        cat.faqs
          .filter((f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
          .map((f) => ({ ...f, category: cat.label }))
      )
    : activeCategory_data?.faqs.map((f) => ({ ...f, category: activeCategory_data.label })) || [];

  const toggle = (key: string) => setOpenFaq(openFaq === key ? null : key);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>FAQ</span>
          </div>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
              <HelpCircle className="w-4 h-4" />
              We have answers
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-5">Frequently Asked Questions</h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Everything you need to know about EventBook. Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          {!search && (
            <div className="flex flex-wrap gap-2 mb-10">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {search && filteredFaqs.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No results found</h3>
              <p className="text-slate-500 dark:text-gray-400 text-sm mb-6">
                We couldn&apos;t find any FAQs matching &ldquo;{search}&rdquo;. Try a different search or contact us directly.
              </p>
              <Button onClick={() => setSearch('')} variant="outline" className="dark:border-gray-700 dark:text-gray-300 mr-3">Clear Search</Button>
              <Link href="/contact"><Button className="bg-blue-600 hover:bg-blue-700">Contact Support</Button></Link>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {search && (
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                  {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
                </p>
              )}
              <div className="space-y-3">
                {filteredFaqs.map((faq, idx) => {
                  const key = `${faq.q}-${idx}`;
                  const isOpen = openFaq === key;
                  return (
                    <div
                      key={key}
                      className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen ? 'border-blue-200 dark:border-blue-700 shadow-sm' : 'border-slate-200 dark:border-gray-700 hover:border-blue-100 dark:hover:border-gray-600'
                      }`}
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full px-6 py-5 flex items-start justify-between gap-4 text-left"
                      >
                        <div className="flex-1">
                          {search && (
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full mb-2 inline-block">
                              {faq.category}
                            </span>
                          )}
                          <p className="font-semibold text-slate-900 dark:text-white text-sm leading-relaxed">{faq.q}</p>
                        </div>
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                          isOpen ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-gray-700 text-slate-500 dark:text-gray-400'
                        }`}>
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5">
                          <div className="h-px bg-slate-100 dark:bg-gray-700 mb-4" />
                          <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Still need help? */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl border border-blue-100 dark:border-blue-800 p-10">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <MessageSquare className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Still Have Questions?</h2>
            <p className="text-slate-600 dark:text-gray-300 mb-8">
              Our friendly support team is ready to help. We typically respond within a few hours during business days.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                  Contact Support <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" className="px-6 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800">
                  Browse Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
