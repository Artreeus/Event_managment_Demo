import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import {
  Check,
  ArrowRight,
  Sparkles,
  Star,
  Camera,
  Utensils,
  Music,
  Flower2,
  Video,
  Mic,
  Building2,
  Tent,
  Users,
  Gift,
} from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: 299,
    description: 'Perfect for intimate gatherings and small celebrations',
    badge: null,
    color: 'border-slate-200 dark:border-gray-700',
    btnClass: 'bg-slate-900 dark:bg-gray-700 hover:bg-slate-800 dark:hover:bg-gray-600 text-white',
    features: [
      'Up to 30 guests',
      '4-hour event coverage',
      '1 service category',
      'Basic decoration setup',
      'Email support',
      'Event planning checklist',
    ],
  },
  {
    name: 'Professional',
    price: 799,
    description: 'Our most popular plan for medium-sized events',
    badge: 'Most Popular',
    color: 'border-blue-500 shadow-xl shadow-blue-100 dark:shadow-blue-950/40',
    btnClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    features: [
      'Up to 100 guests',
      '8-hour event coverage',
      '3 service categories',
      'Premium decoration package',
      'Dedicated event coordinator',
      'Priority phone & email support',
      'Custom event timeline',
      'Vendor coordination',
    ],
  },
  {
    name: 'Enterprise',
    price: 1999,
    description: 'Full-service planning for large-scale events',
    badge: 'Best Value',
    color: 'border-purple-500 shadow-xl shadow-purple-100 dark:shadow-purple-950/40',
    btnClass: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
    features: [
      'Unlimited guests',
      'Full-day event coverage',
      'All service categories',
      'Luxury decoration & design',
      'Senior event manager',
      '24/7 dedicated support',
      'Custom event branding',
      'Full vendor management',
      'Post-event recap report',
      'Free reshoot guarantee',
    ],
  },
];

const services = [
  { icon: Camera, name: 'Photography', desc: 'Professional photographers for every occasion', from: 299, color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' },
  { icon: Video, name: 'Videography', desc: 'Cinematic event films and highlight reels', from: 399, color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
  { icon: Utensils, name: 'Catering', desc: 'Gourmet food and beverage services', from: 25, color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
  { icon: Flower2, name: 'Florals & Décor', desc: 'Stunning arrangements and themed setups', from: 199, color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' },
  { icon: Music, name: 'Entertainment', desc: 'DJs, bands, and live performers', from: 499, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
  { icon: Mic, name: 'MC / Host', desc: 'Professional emcees and event hosts', from: 349, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
  { icon: Building2, name: 'Venue Rental', desc: 'Exclusive venues for every event type', from: 999, color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400' },
  { icon: Tent, name: 'Outdoor Events', desc: 'Tents, staging, and outdoor setups', from: 599, color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
  { icon: Gift, name: 'Gifts & Favors', desc: 'Custom party favors and gift packages', from: 149, color: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' },
];

const faqs = [
  { q: 'Can I mix services from different tiers?', a: 'Yes! Our packages are flexible. You can customize any tier by adding individual service categories at their respective rates.' },
  { q: 'Are there any hidden fees?', a: 'Never. All prices are transparent. The only extras are travel fees for events outside a 50-mile radius (disclosed upfront).' },
  { q: 'Can I get a custom quote?', a: 'Absolutely. For large or unique events, contact our team for a fully customized proposal tailored to your exact needs.' },
  { q: 'What is your cancellation policy?', a: 'Full refund for cancellations 7+ days before the event. 50% refund for 3–7 days. No refund within 72 hours.' },
];

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-300 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span><span>Services & Pricing</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
            <Sparkles className="w-4 h-4" />Simple, transparent pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-5">Services & Pricing</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need for a perfect event. Choose a plan or mix and match individual services.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Event Packages</h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-xl mx-auto">All packages include our satisfaction guarantee and dedicated support.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div key={tier.name} className={`relative bg-white dark:bg-gray-800 rounded-2xl border-2 ${tier.color} p-8 flex flex-col`}>
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm ${
                      tier.badge === 'Most Popular'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    }`}>
                      <Star className="w-3 h-3 fill-white" />{tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{tier.name}</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-sm">{tier.description}</p>
                </div>

                <div className="mb-7">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">${tier.price}</span>
                    <span className="text-slate-500 dark:text-gray-400 text-sm mb-1">/event</span>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">No booking fees</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href="/categories">
                  <Button className={`w-full ${tier.btnClass}`}>
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 dark:text-gray-400 text-sm mt-8">
            Need something custom?{' '}
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Contact our team</Link>{' '}
            for a personalized quote.
          </p>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Individual Services</h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-xl mx-auto">
              Only need one or two things? Book individual services starting from:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {services.map((s) => (
              <Link key={s.name} href="/categories" className="group block">
                <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{s.name}</h3>
                  <p className="text-slate-500 dark:text-gray-400 text-xs mb-3 leading-relaxed">{s.desc}</p>
                  <p className="text-blue-600 dark:text-blue-400 text-xs font-semibold">From ${s.from}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white text-center mb-10">Pricing FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm">{faq.q}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-slate-500 dark:text-gray-400 text-sm">
            More questions?{' '}
            <Link href="/faq" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">View full FAQ</Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Start Planning Today</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Browse our full catalog of event services and find the perfect combination for your celebration.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8">
                Browse All Services <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8">
                Request Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
