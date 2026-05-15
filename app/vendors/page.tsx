import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import {
  Star,
  MapPin,
  CheckCircle,
  ArrowRight,
  Camera,
  Utensils,
  Music,
  Flower2,
  Video,
  Mic,
  Search,
  Award,
  Users,
} from 'lucide-react';

const specialties = ['All', 'Photography', 'Catering', 'Music & DJ', 'Florals', 'Videography', 'MC / Host'];

const vendors = [
  { id: 1, name: 'Lucas Bennett Photography', specialty: 'Photography', rating: 4.9, reviews: 124, location: 'Manhattan, NY', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', icon: Camera, verified: true, events: 215, bio: 'Award-winning event photographer specializing in weddings and corporate events.', from: 499 },
  { id: 2, name: 'La Bella Cucina', specialty: 'Catering', rating: 4.8, reviews: 98, location: 'Brooklyn, NY', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', icon: Utensils, verified: true, events: 180, bio: 'Italian-inspired catering for events of all sizes. Farm-to-table menus available.', from: 35 },
  { id: 3, name: 'DJ Marcus Sound', specialty: 'Music & DJ', rating: 5.0, reviews: 87, location: 'Queens, NY', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80', icon: Music, verified: true, events: 320, bio: 'Professional DJ with 10+ years experience across weddings, galas, and parties.', from: 399 },
  { id: 4, name: 'Bloom Studio', specialty: 'Florals', rating: 4.9, reviews: 156, location: 'Upper East Side, NY', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80', icon: Flower2, verified: true, events: 430, bio: 'Luxury floral design studio creating stunning arrangements for all occasions.', from: 199 },
  { id: 5, name: 'CineFrame Productions', specialty: 'Videography', rating: 4.7, reviews: 62, location: 'SoHo, NY', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80', icon: Video, verified: true, events: 145, bio: 'Cinematic event videography and same-day edits for weddings and corporate events.', from: 599 },
  { id: 6, name: 'Sarah Voices MC', specialty: 'MC / Host', rating: 4.8, reviews: 44, location: 'Midtown, NY', img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80', icon: Mic, verified: true, events: 92, bio: 'Charismatic event host who keeps audiences engaged. English, Spanish and French.', from: 349 },
  { id: 7, name: 'Golden Frame Studios', specialty: 'Photography', rating: 4.6, reviews: 78, location: 'Bronx, NY', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80', icon: Camera, verified: false, events: 110, bio: 'Affordable photography for birthday parties, graduations, and intimate events.', from: 299 },
  { id: 8, name: 'Chef Adriana Catering', specialty: 'Catering', rating: 4.9, reviews: 113, location: 'Staten Island, NY', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80', icon: Utensils, verified: true, events: 267, bio: 'Mediterranean and fusion cuisine for weddings and gala dinners.', from: 45 },
  { id: 9, name: 'Beat Masters NYC', specialty: 'Music & DJ', rating: 4.7, reviews: 55, location: 'Harlem, NY', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80', icon: Music, verified: false, events: 198, bio: 'Hip-hop and R&B specialists. Perfect for birthday parties and club events.', from: 299 },
];

const whyJoin = [
  { icon: Users, title: 'Access Thousands of Clients', desc: 'Connect with verified customers looking for exactly your services.' },
  { icon: Award, title: 'Build Your Reputation', desc: 'Earn reviews and ratings that grow your business organically.' },
  { icon: CheckCircle, title: 'Verified & Trusted Badge', desc: 'Get our trust badge after completing the verification process.' },
];

export default function VendorsPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span><span>Vendors</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-5">
                <CheckCircle className="w-4 h-4" />500+ Verified Professionals
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Meet Our Vendors</h1>
              <p className="text-xl text-slate-300">Every professional on EventBook is background-checked, verified, and reviewed by real customers.</p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/contact">
                <Button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-6">
                  Join as a Vendor <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[['500+', 'Verified Vendors'], ['50+', 'Specialties'], ['10,000+', 'Events Completed'], ['4.9★', 'Avg Rating']].map(([v, l]) => (
              <div key={l}><div className="text-2xl font-bold">{v}</div><div className="text-blue-100 text-xs mt-0.5">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Vendors */}
      <section className="py-14 bg-slate-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          {/* Search + Filter row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search vendors..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((s) => (
                <button key={s} className="px-3 py-2 rounded-full text-xs font-medium border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-slate-600 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                {/* Header */}
                <div className="p-5 flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <img src={vendor.img} alt={vendor.name} className="w-14 h-14 rounded-2xl object-cover" />
                    {vendor.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-snug">{vendor.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">{vendor.specialty}</span>
                      {vendor.verified && <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">✓ Verified</span>}
                    </div>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{vendor.rating}</span>
                      <span className="text-xs text-slate-400 dark:text-gray-500">({vendor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-4 flex-1">
                  <p className="text-slate-500 dark:text-gray-400 text-xs leading-relaxed mb-4">{vendor.bio}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
                    <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{vendor.location}</div>
                    <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{vendor.events} events</div>
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-slate-100 dark:border-gray-700 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Starting from</p>
                    <p className="font-bold text-slate-900 dark:text-white text-lg">${vendor.from}</p>
                  </div>
                  <Link href="/categories">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Book Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join as Vendor */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-3">Are You a Professional?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
              Join our network of verified event professionals and grow your business with EventBook.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {whyJoin.map((w) => (
                <div key={w.title} className="bg-white/10 rounded-2xl p-5 text-left">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                    <w.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1 text-sm">{w.title}</h3>
                  <p className="text-blue-100 text-xs leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 shadow-lg">
                Apply to Join <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
