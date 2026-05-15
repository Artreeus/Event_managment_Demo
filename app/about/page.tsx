import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import {
  ArrowRight,
  CheckCircle,
  Heart,
  Shield,
  Zap,
  Users,
  Globe,
  Award,
  Target,
  Lightbulb,
} from 'lucide-react';

const stats = [
  { value: '2019', label: 'Founded' },
  { value: '10,000+', label: 'Events Managed' },
  { value: '500+', label: 'Trusted Professionals' },
  { value: '98%', label: 'Customer Satisfaction' },
];

const values = [
  { icon: Heart, color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400', title: 'Customer First', description: 'Every decision we make starts with our customers. Your satisfaction and peace of mind are our top priorities.' },
  { icon: Shield, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', title: 'Trust & Safety', description: 'We verify every professional on our platform to ensure you always get reliable, high-quality service.' },
  { icon: Zap, color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400', title: 'Innovation', description: 'We constantly evolve our platform to bring you the best booking experience and newest features.' },
  { icon: Globe, color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', title: 'Accessibility', description: 'We believe everyone deserves access to great event services, regardless of location or budget.' },
];

const team = [
  { name: 'Alexandra Morgan', role: 'CEO & Co-Founder', bio: 'Former event planner with 15 years of experience. Passionate about making events accessible for everyone.', initial: 'A', color: 'bg-purple-500' },
  { name: 'James Chen', role: 'CTO & Co-Founder', bio: 'Full-stack engineer who built the first version of EventBook in a weekend hackathon in 2019.', initial: 'J', color: 'bg-blue-500' },
  { name: 'Priya Sharma', role: 'Head of Operations', bio: 'Ex-hospitality professional who manages our network of verified event service providers.', initial: 'P', color: 'bg-green-500' },
  { name: 'Marcus Lee', role: 'Head of Design', bio: 'UX designer dedicated to creating intuitive booking experiences that delight customers.', initial: 'M', color: 'bg-orange-500' },
  { name: 'Sofia Reyes', role: 'Head of Marketing', bio: 'Growth strategist who has helped EventBook expand to over 50 cities across the country.', initial: 'S', color: 'bg-pink-500' },
  { name: 'Daniel Park', role: 'Head of Customer Success', bio: 'Dedicated to ensuring every customer has an outstanding experience from booking to event day.', initial: 'D', color: 'bg-teal-500' },
];

const milestones = [
  { year: '2019', title: 'EventBook Founded', description: 'Started with a simple idea: make professional event booking as easy as ordering food online.' },
  { year: '2020', title: '1,000 Bookings', description: 'Reached our first major milestone during a challenging year, proving that people still needed to celebrate.' },
  { year: '2021', title: 'Series A Funding', description: 'Raised $5M to expand our professional network and improve the platform experience.' },
  { year: '2022', title: 'National Expansion', description: 'Expanded from 5 cities to 50+ cities across the country with over 200 verified professionals.' },
  { year: '2023', title: '10,000 Events', description: 'Crossed the 10,000 events managed milestone with a 98% customer satisfaction rate.' },
  { year: '2024', title: 'International Launch', description: 'Began international expansion with launches in Canada and the United Kingdom.' },
];

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-24">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-6">
              <Heart className="w-4 h-4 fill-blue-300" />
              Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              We&apos;re on a Mission to Make{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Every Event Unforgettable
              </span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              EventBook was born from a simple frustration: booking professional event services was too complicated, too time-consuming, and too unreliable. We built the platform we wished existed.
            </p>
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

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
                <Target className="w-4 h-4" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Connecting You with the Best Event Professionals
              </h2>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-5">
                EventBook was founded in 2019 by two friends who spent weeks trying to find a reliable caterer for a company party. After calling dozens of vendors, comparing quotes, and wading through outdated websites, they realized there had to be a better way.
              </p>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed mb-8">
                Today, EventBook connects thousands of customers with hundreds of vetted event professionals every month. From intimate birthday dinners to large corporate conferences, we make the process seamless, transparent, and enjoyable.
              </p>
              <div className="space-y-3">
                {['Verified & vetted professionals only', 'Transparent pricing with no hidden fees', 'Dedicated support throughout your event', 'Money-back satisfaction guarantee'].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-gray-300 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
                    <Users className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-3xl font-bold">500+</p>
                    <p className="text-blue-100 text-sm mt-1">Active Professionals</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700">
                    <Award className="w-8 h-8 mb-3 text-yellow-500" />
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">50+</p>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Service Types</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-slate-50 dark:bg-gray-800 rounded-2xl p-6 border border-slate-200 dark:border-gray-700">
                    <Globe className="w-8 h-8 mb-3 text-green-500" />
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">50+</p>
                    <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Cities Covered</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
                    <Lightbulb className="w-8 h-8 mb-3 opacity-80" />
                    <p className="text-3xl font-bold">98%</p>
                    <p className="text-purple-100 text-sm mt-1">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              What We Believe
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
              These aren&apos;t just words on a wall — they guide every decision we make.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${v.color} rounded-xl flex items-center justify-center mb-5`}>
                  <v.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{v.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Milestones & Growth</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-gray-700" />
              <div className="space-y-8">
                {milestones.map((m, idx) => (
                  <div key={m.year} className="relative flex gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 text-sm font-bold ${
                      idx === milestones.length - 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900' : 'bg-white dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-300'
                    }`}>
                      {m.year}
                    </div>
                    <div className="bg-slate-50 dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 p-5 flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{m.title}</h3>
                      <p className="text-slate-500 dark:text-gray-400 text-sm">{m.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              The People
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto">
              A passionate team of event lovers, tech enthusiasts, and customer advocates.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-100 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-14 h-14 ${member.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xl font-bold text-white">{member.initial}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">{member.role}</p>
                  </div>
                </div>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of happy customers and hundreds of trusted professionals on EventBook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/categories">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 shadow-lg">
                Browse Services <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
