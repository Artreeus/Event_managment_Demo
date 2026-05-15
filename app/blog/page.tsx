import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { ArrowRight, Calendar, Clock, User, Tag, Search, TrendingUp } from 'lucide-react';

const featuredPost = {
  id: 1,
  title: 'The Ultimate Guide to Planning a Corporate Event in 2024',
  excerpt: 'From venue selection to catering and entertainment, this comprehensive guide covers everything you need to know to plan a successful corporate event that impresses clients and motivates employees.',
  category: 'Corporate Events',
  author: 'Alexandra Morgan',
  date: 'May 10, 2025',
  readTime: '12 min read',
  img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
  tags: ['Corporate', 'Planning', 'Guide'],
};

const posts = [
  {
    id: 2, title: '10 Wedding Decoration Trends Taking Over 2025', excerpt: 'From maximalist florals to sustainable décor, discover the hottest wedding decoration trends that couples are loving this year.', category: 'Weddings', author: 'Priya Sharma', date: 'May 8, 2025', readTime: '7 min read', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', tags: ['Weddings', 'Trends'],
  },
  {
    id: 3, title: 'How to Choose the Perfect Venue for Your Event', excerpt: 'Location is everything. Learn the 7 key factors to consider when selecting your event venue, from capacity to acoustics and ambiance.', category: 'Planning Tips', author: 'Marcus Lee', date: 'May 5, 2025', readTime: '6 min read', img: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', tags: ['Planning', 'Venues'],
  },
  {
    id: 4, title: 'Budget-Friendly Birthday Party Ideas That Look Expensive', excerpt: 'Throw a memorable birthday celebration without breaking the bank. Creative ideas to make any age milestone feel truly special.', category: 'Birthday Parties', author: 'Sofia Reyes', date: 'May 1, 2025', readTime: '5 min read', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', tags: ['Birthday', 'Budget'],
  },
  {
    id: 5, title: 'Catering Mistakes to Avoid at Your Next Event', excerpt: 'Even the best-planned events can go wrong when food is involved. Here are the most common catering pitfalls and how to sidestep them.', category: 'Food & Catering', author: 'Daniel Park', date: 'Apr 28, 2025', readTime: '8 min read', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', tags: ['Catering', 'Tips'],
  },
  {
    id: 6, title: 'Virtual vs. In-Person Events: What Works Best in 2025', excerpt: 'The hybrid event landscape has evolved dramatically. We break down the pros and cons so you can make the right choice for your audience.', category: 'Industry Insights', author: 'James Chen', date: 'Apr 25, 2025', readTime: '9 min read', img: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80', tags: ['Virtual', 'Hybrid'],
  },
  {
    id: 7, title: 'Sustainable Events: How to Go Green Without Sacrificing Style', excerpt: 'Eco-friendly event planning is no longer just a trend — it\'s a responsibility. Discover practical ways to reduce waste without compromising on elegance.', category: 'Sustainability', author: 'Alexandra Morgan', date: 'Apr 20, 2025', readTime: '6 min read', img: 'https://images.unsplash.com/photo-1496843916299-590492c751f4?w=800&q=80', tags: ['Eco', 'Sustainability'],
  },
];

const categories = ['All', 'Weddings', 'Corporate Events', 'Birthday Parties', 'Planning Tips', 'Food & Catering', 'Industry Insights'];

const trending = [
  { id: 2, title: '10 Wedding Decoration Trends for 2025', reads: '4.2k reads' },
  { id: 3, title: 'How to Choose the Perfect Venue', reads: '3.8k reads' },
  { id: 5, title: 'Catering Mistakes to Avoid', reads: '2.9k reads' },
];

export default function BlogPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span><span>Blog</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 text-sm text-blue-300 mb-5">
                <TrendingUp className="w-4 h-4" />Expert Event Planning Insights
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">EventBook Blog</h1>
              <p className="text-xl text-slate-300">Tips, trends, and inspiration for planning unforgettable events.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50 dark:bg-gray-950 py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">

            {/* Main content */}
            <div className="lg:col-span-3">

              {/* Featured Post */}
              <div className="mb-10">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 mb-5">
                  <TrendingUp className="w-4 h-4" />Featured Article
                </div>
                <Link href={`/blog/${featuredPost.id}`} className="group block">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative h-72 overflow-hidden">
                      <img src={featuredPost.img} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {featuredPost.category}
                      </span>
                    </div>
                    <div className="p-7">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-slate-500 dark:text-gray-400 mb-5 leading-relaxed">{featuredPost.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-gray-400">
                          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{featuredPost.author}</span>
                          <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featuredPost.date}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
                        </div>
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Post Grid */}
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-gray-200 mb-5">
                Latest Articles
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-44 overflow-hidden flex-shrink-0">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 text-slate-700 dark:text-gray-200 text-xs font-semibold px-2.5 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug text-sm line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-500 dark:text-gray-400 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-gray-500 mt-auto">
                          <span className="flex items-center gap-1.5"><User className="w-3 h-3" />{post.author}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Search */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Search Articles</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search blog..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.slice(1).map((cat) => (
                    <button key={cat} className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400 dark:text-gray-500" />{cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-slate-200 dark:border-gray-700 p-5">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-500" />Trending Now
                </h3>
                <div className="space-y-4">
                  {trending.map((t, i) => (
                    <div key={t.id} className="flex gap-3">
                      <span className="text-2xl font-black text-slate-200 dark:text-gray-700 leading-none w-6 flex-shrink-0">{i + 1}</span>
                      <div>
                        <Link href={`/blog/${t.id}`} className="text-sm font-medium text-slate-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                          {t.title}
                        </Link>
                        <p className="text-xs text-slate-400 dark:text-gray-500 mt-0.5">{t.reads}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-5 text-white">
                <h3 className="font-bold mb-2">Ready to Plan?</h3>
                <p className="text-blue-100 text-sm mb-4">Browse our services and book your next event today.</p>
                <Link href="/categories">
                  <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 text-sm font-semibold">
                    Browse Services <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
