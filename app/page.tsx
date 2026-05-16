import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import NewsletterForm from '@/components/NewsletterForm';
import {
  Sparkles,
  Calendar,
  CheckCircle,
  Users,
  ArrowRight,
  Star,
  Shield,
  Clock,
  ChevronRight,
  Trophy,
  HeartHandshake,
  Zap,
} from 'lucide-react';

const stats = [
  { value: '10,000+', label: 'Events Booked' },
  { value: '500+', label: 'Professionals' },
  { value: '50+', label: 'Service Categories' },
  { value: '4.9/5', label: 'Average Rating' },
];

const features = [
  { icon: Calendar, color: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400', title: 'Easy Booking', description: 'Simple and intuitive booking process. Select your service, choose your date, and confirm in minutes.' },
  { icon: CheckCircle, color: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400', title: 'Verified Professionals', description: 'All our service providers are vetted and verified to ensure top-quality, reliable service every time.' },
  { icon: Shield, color: 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400', title: 'Secure Payments', description: 'Your payments are protected with bank-level encryption. Book with confidence, always.' },
  { icon: Clock, color: 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400', title: '24/7 Support', description: 'Our dedicated support team is available around the clock to help with any questions or concerns.' },
  { icon: Trophy, color: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400', title: 'Best Pricing', description: 'Get competitive pricing with no hidden fees. Find the perfect package that fits your budget.' },
  { icon: HeartHandshake, color: 'bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400', title: 'Satisfaction Guaranteed', description: "We stand behind every booking. If you're not satisfied, we'll make it right." },
];

const steps = [
  { step: '01', title: 'Browse Services', description: 'Explore our wide range of event categories and service packages tailored to your needs.' },
  { step: '02', title: 'Choose a Package', description: 'Compare packages, read reviews, and select the perfect option for your event.' },
  { step: '03', title: 'Book & Pay Securely', description: 'Complete your booking in minutes with our secure payment system.' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Wedding Planner', content: 'EventBook made our wedding planning so much easier. Found the perfect photographer and caterer within hours!', rating: 5 },
  { name: 'Michael Chen', role: 'Corporate Event Manager', content: 'We use EventBook for all our corporate events. The quality of professionals is consistently outstanding.', rating: 5 },
  { name: 'Emily Rodriguez', role: 'Birthday Party Host', content: 'Booked an amazing party planner through EventBook. Everything went perfectly. Highly recommend!', rating: 5 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Trusted by 10,000+ customers worldwide</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Book Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Perfect Event
              </span>{' '}
              Experience
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Discover and book professional event services with ease. From intimate gatherings to grand celebrations — we connect you with the best professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="/categories">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25 px-8">
                  Browse Services <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-white/10 hover:text-white px-8">
                  Get Started Free
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />No booking fees</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />Free cancellation</div>
              <div className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />Verified professionals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-blue-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Why EventBook
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything You Need in One Place</h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
              We make event planning effortless with powerful tools and a trusted network of professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="group p-6 rounded-2xl border border-slate-100 dark:border-gray-800 hover:border-blue-100 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-950/20 transition-all duration-300 bg-white dark:bg-gray-800">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">Book your perfect event in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-800 dark:via-purple-800 dark:to-blue-800" />
            {steps.map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 border-2 border-blue-100 dark:border-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm relative z-10">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/categories">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Start Browsing <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-yellow-500 dark:fill-yellow-400" />
              Customer Reviews
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Loved by Thousands</h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
              Don&apos;t just take our word for it — hear from our happy customers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-slate-100 dark:border-gray-800 bg-slate-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-5">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Perfect Event?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of happy customers who trust EventBook for their special occasions. Start exploring today — it&apos;s completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 shadow-lg">
                Explore Services <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4" />
              Stay in the Loop
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
              Get Event Planning Tips & Exclusive Deals
            </h2>
            <p className="text-slate-500 dark:text-gray-400 mb-8">
              Join 5,000+ event planners getting weekly inspiration, vendor spotlights, and special offers.
            </p>
            <NewsletterForm />
            <p className="text-xs text-slate-400 dark:text-gray-500 mt-3">No spam, ever. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="py-10 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">New to EventBook? Load our demo data to explore the platform with sample content.</p>
          <Link href="/seed-db">
            <Button variant="outline" size="sm" className="text-slate-600 dark:text-gray-300 border-slate-300 dark:border-gray-700 dark:hover:bg-gray-800">
              Load Demo Data
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
